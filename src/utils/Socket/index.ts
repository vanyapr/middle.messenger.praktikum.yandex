import { socketURL, chats, wsPingPongInterval } from '../../settings/api';

export default class Socket {
  private _chatID: string

  private _token: string

  private _userID: string

  private _chatURL: string

  private socket: WebSocket

  constructor(userID: string, chatID: string, token: string) {
    this._userID = userID;
    this._chatID = chatID;
    this._token = token;
    this._chatURL = `${socketURL}${chats}/${this._userID}/${this._chatID}/${this._token}`;
    this.init();
  }

  // Создает сокет с указанным чатом, поддерживает соединение
  createConnection() {
    console.log(`Подключили сокет для чата ${this._chatID}`);
    // Создали подключение
    const socket = new WebSocket(this._chatURL);

    // Обработка ответа от сервера
    socket.onmessage = this.listenMessages;

    // Запустили обмен пакетами для поддержания соединения
    const ping = JSON.stringify({ type: 'ping' });

    setInterval(() => {
      socket.send(ping);
    }, wsPingPongInterval);
  }

  // Выполняет пинг-понг по таймауту
  pingPong(): void {
    const ping = { type: 'ping' };

    this.socket.send(JSON.stringify(ping));
  }

  // Слушает сообщения
  listenMessages(event: any): void {
    const incomingMessage = event.data;
    console.log(incomingMessage);

    // TODO: При получении сообщения
    //  1) Проверяем тип сообщения
    //  2) Если тип message
    //  3) То добавляем новое сообщение в список сообщений чата
    //  4) Повторно рендерим чаты
    if (incomingMessage.type === 'pong') {
      console.log('Служебное сообщение');
    } else if (incomingMessage.type === 'message') {
      console.log('Получено сообщение');
      console.log(incomingMessage.content);
    }
  }

  // Отправка сообщения
  sendMessage(data: any) {
    this.socket.send(data);
  }

  // Получаем объект с новыми сообщениями
  getNewMessages(offset: number) {
    const requestBody = JSON.stringify({
      content: `${offset}`,
      type: 'get old',
    });

    this.socket.send(requestBody);
  }

  // Инициализируем сокет
  init() {
    this.createConnection();
  }
}
