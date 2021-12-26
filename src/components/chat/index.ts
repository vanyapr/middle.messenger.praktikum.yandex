import '../../styles/components/chat/chat.scss';
import template from './chat.tpl';
import Block from '../../utils/Block/Block';
import State from '../../utils/State/State';
import compile from '../../utils/Compile/compile';
import ChatsAPI from '../../connectors/ChatsAPI';
import { chats, socketURL, wsPingPongInterval } from '../../settings/api';
const chatsAPI = new ChatsAPI();

// Стейт приложения
const state = new State();

class Chat extends Block {
  private _chatID: number

  private _chatURL: string

  private _socket: WebSocket

  private _pingIntervalID: any

  constructor(props: any) {
    super(props, 'div', 'chat');
    this._chatID = props.id;
    this._configure();
    // this._getUnreadedMessages();

    // Вызываем вручную, я устал и не понимаю почему кдм не вызывается тут
    this.componentDidMount();
  }

  componentDidMount = () => {
    const updater = () => {
      const chat = state.get(`chat-${this._chatID}`);

      this.setProps(chat);
    };

    state.registerComponent(`chat-${this._chatID}`, updater);
  }

  // Вернуть ID текущего чата
  getID(): number {
    return this._chatID;
  }

  // Конфигурация чата для дальнейшей работы
  protected _configure() {
    // Получаем данные по апи
    Promise.all([
      chatsAPI.getChatUsersList(this._chatID),
      chatsAPI.getChatToken(this._chatID),
      chatsAPI.getChatUnreadMessagesCount(this._chatID),
    ])
      .then((result: any) => {
        const [usersList, chatToken, unreadMessages] = result;
        const users = JSON.parse(usersList.responseText);
        const token = JSON.parse(chatToken.responseText);
        const unread = JSON.parse(unreadMessages.responseText);
        return [users, token, unread];
      })
      .then(([users, tokenData, unreadData]) => {
        const { token } = tokenData;
        // eslint-disable-next-line camelcase
        const { unread_count } = unreadData;

        // Если в стейте есть сообщения, прочитаем их
        const messagesList = state.get(`chat-${this._chatID}`) ? state.get(`chat-${this._chatID}`).messagesList : [];

        // Запишем список юзеров и число непрочитанных сообщений в пропсы
        this.setProps({ users, unread_count, messagesList });

        // Запишем данные в стейт
        state.set(`chat-${this._chatID}`, { users, unread_count, messagesList });

        // Запишем урл сокета
        this._chatURL = `${socketURL}${chats}/${state.get('settings').id}/${this._chatID}/${token}`;

        // Подключились к сокету
        this._connectSocket();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  protected _sendPing = () => {
    // Запустили обмен пакетами для поддержания соединения
    const ping = JSON.stringify({ type: 'ping' });

    this._socket.send(ping);
  }

  // Подключили к сокету
  protected _connectSocket = () => {
    // Создали подключение
    this._socket = new WebSocket(this._chatURL);
    this._pingIntervalID = setInterval(this._sendPing, wsPingPongInterval);

    // Обработка ответа от сервера
    this._socket.onmessage = this._listenSocketMessages;

    // Получение непрочитанных сообщений
    this._socket.addEventListener('open', () => {
      // eslint-disable-next-line camelcase
      const { unread_count } = state.get(`chat-${this._chatID}`);

      // Если в чате есть непрочитанные сообщения, получим их
      // eslint-disable-next-line camelcase
      if (unread_count) {
        let offset = 0;
        // eslint-disable-next-line camelcase
        while (unread_count >= offset) {
          this._socket.send(JSON.stringify({
            content: `${offset}`,
            type: 'get old',
          }));

          offset += 20;
        }
      }
    });
  }

  // Слушает сообщения из сокета
  protected _listenSocketMessages = (event: any): void => {
    const incomingMessage = event.data;
    const message = JSON.parse(incomingMessage);

    // Если получен список сообщений
    if (Array.isArray(message)) {
      // Запись в начало списка сообщений
      const unsortedMessagesList = [...this.props.messagesList, ...message];
      // @ts-ignore
      const messagesList = unsortedMessagesList.sort((item1, item2) => {
        if (item1.time > item2.time) {
          return 1;
        } if (item1.time < item2.time) {
          return -1;
        }

        return 0;
      });

      const { id: currentChatId } = state.get('currentChat');

      // eslint-disable-next-line camelcase
      let unread_count = messagesList.length;

      if (currentChatId !== this._chatID) {
        // eslint-disable-next-line camelcase
        unread_count = 0;
        state.set('messages', { messagesList });
      }

      state.set(`chat-${this._chatID}`, { messagesList, last_message: messagesList[messagesList.length - 1], unread_count });
    }

    if (message.type === 'message') {
      // eslint-disable-next-line no-shadow,camelcase
      let { messagesList, unread_count } = state.get(`chat-${this._chatID}`);

      if (!messagesList) {
        messagesList = [];
      }

      const updatedMessagesList = [...messagesList, message];
      const { id: currentChatId } = state.get('currentChat');

      // Если этот чат уже открыт, то мы не увеличиваем его число непрочитанных сообщений
      if (currentChatId !== this._chatID) {
        // eslint-disable-next-line camelcase
        unread_count += 1;
      }

      state.set(`chat-${this._chatID}`, {
        messagesList: updatedMessagesList,
        last_message: message,
        unread_count,
      });

      // Если этот чат уже открыт, то мы добавляем в него сообщения
      if (currentChatId === this._chatID) {
        state.set('messages', { messagesList: updatedMessagesList });
      }
    }
  }

  destroy = () => {
    clearInterval(this._pingIntervalID);
    this._socket.close(1000, 'Чат будет удален');
    state.delete(`chat-${this._chatID}`);
  }

  // Получить список юзеров чата
  getUsers() {
    return this.props.users;
  }

  // Получить список сообщений чата
  getMessagesList() {
    return this.props.messagesList ? this.props.messagesList : [];
  }

  // Метод отправки сообщений
  sendMessage = (message: string) => {
    const chatMessage = JSON.stringify({
      content: message,
      type: 'message',
    });

    // Отправка сообщения
    this._socket.send(chatMessage);
  }

  makeActive() {
    this.getContent().classList.add('chat_state_current');

    // Обнулили число непрочитанных сообщений
    state.set(`chat-${this._chatID}`, { unread_count: 0 });

    // Записали ID и юзеров текущего чата в стейт
    const currentChatUsers = state.get(`chat-${this._chatID}`).users;
    state.addState('currentChat', { id: this._chatID, users: currentChatUsers });
  }

  render() {
    return compile(template, { ...this.props });
  }
}

export default Chat;
