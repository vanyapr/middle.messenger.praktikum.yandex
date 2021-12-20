import { socketURL, chats, wsPingPongInterval } from '../../settings/api';

export default class SocketConnector {
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
    console.log(this._chatURL);
  }

  // Создает сокет с указанным чатом, поддерживает соединение
  createConnection() {
    console.log('Подключили сокет для чата');
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

  // // Слушает сообщения
  listenMessages(event: any): void {
    const incomingMessage = event.data;
    console.log(incomingMessage);
  }

  // Инициализируем сокет
  init() {
    this.createConnection();
  }
}
