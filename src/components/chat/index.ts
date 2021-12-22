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

  constructor(props: any) {
    super(props, 'div', 'chat');
    this._chatID = props.id;
    this._configure();
  }

  componentDidMount = () => {
    const updater = () => {
      const chat = state.get(`chat-${this._chatID}`);

      this.setProps(chat);
    };

    state.registerComponent(`chat-${this._chatID}`, updater);
  }

  // Получить число непрочитанных сообщений
  getUnreadMessagesCount() {
    return chatsAPI.getChatUnreadMessagesCount(this._chatID)
      .then((response: XMLHttpRequest) => JSON.parse(response.responseText))
      .then((parsed) => parsed.unreadCount)
      .catch((error) => {
        console.log(error);
      });
  }

  // Вернуть ID текущего чата
  getID() {
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

        // Если в чате есть непрочитанные сообщения, получим их
        // eslint-disable-next-line camelcase
        if (unread_count) {
          // TODO: Получить непрочитанные сообщения
          //  И добавить в пропс чата число непрочитанных сообщений
        }

        // Если в стейте есть сообщения, прочитаем их
        const messagesList = state.get(`chat-${this._chatID}`) ? state.get(`chat-${this._chatID}`).messagesList : [];

        console.log(messagesList);

        // Запишем список юзеров и число непрочитанных сообщений в пропсы
        this.setProps({ users, unread_count, messagesList });

        // Запишем урл сокета
        this._chatURL = `${socketURL}${chats}/${state.get('settings').id}/${this._chatID}/${token}`;

        // Подключились к сокету
        this._connectSocket();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Подключили к сокету
  protected _connectSocket = () => {
    // Создали подключение
    this._socket = new WebSocket(this._chatURL);
    console.log(`Подключили сокет для чата ${this._chatID}`);

    // Запустили обмен пакетами для поддержания соединения
    const ping = JSON.stringify({ type: 'ping' });

    setInterval(() => {
      this._socket.send(ping);
    }, wsPingPongInterval);

    // Обработка ответа от сервера
    this._socket.onmessage = this._listenSocketMessages;
  }

  // Слушает сообщения из сокета
  protected _listenSocketMessages = (event: any): void => {
    const incomingMessage = event.data;
    const message = JSON.parse(incomingMessage);

    if (message.type === 'message') {
      console.log('Получено сообщение');
      console.log(message.content);

      // eslint-disable-next-line no-shadow
      const messagesList = [...this.props.messagesList, message];
      this.setProps({ messagesList });
      state.set('messages', { messagesList });
      state.set(`chat-${this._chatID}`, { messagesList });
    }
  }

  // Получить список юзеров чата
  getUsers() {
    return this.props.users;
  }

  // Получить список сообщений чата
  getMessagesList() {
    const messagesList = this.props.messagesList ? this.props.messagesList : [];
    return messagesList;
  }

  // Метод отправки сообщений
  sendMessage = (message: string) => {
    console.log(`Отправка сообщения в чат ${this._chatID}`);

    const chatMessage = JSON.stringify({
      content: message,
      type: 'message',
    });

    // Отправка сообщения
    this._socket.send(chatMessage);
  }

  makeActive() {
    this.getContent().classList.add('chat_state_current');
  }

  render() {
    return compile(template, { ...this.props });
  }
}

export default Chat;
