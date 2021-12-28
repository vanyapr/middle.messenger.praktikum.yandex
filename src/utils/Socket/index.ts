import { wsPingPongInterval } from '../../settings/api';

export default class Socket {
  readonly _chatURL: string

  private _pingIntervalID: number

  private readonly _socket: WebSocket

  constructor(chatURL: string) {
    this._chatURL = chatURL;
    this._socket = new WebSocket(this._chatURL);
    this._enablePingPong();
  }

  // Создает сокет с указанным чатом, поддерживает соединение
  listen = (listener: any) => {
    // Создали подключение
    this._socket.onmessage = listener;
  }

  // Событие на открыти сокета
  onopen = (listener: any) => {
    this._socket.onopen = listener;
  }

  // Отправка сообщения
  send(data: any): void {
    this._socket.send(data);
  }

  // Уничтожает сокет
  disconnect(): void {
    window.clearInterval(this._pingIntervalID);
    this._socket.close(1000, 'Сокет отключен');
  }

  // Отправляет пинг
  protected _sendPing = (): void => {
    // Запустили обмен пакетами для поддержания соединения
    const ping = JSON.stringify({ type: 'ping' });
    this._socket.send(ping);
  }

  // Включает пинг-понг по таймауту
  private _enablePingPong(): void {
    this._pingIntervalID = window.setInterval(this._sendPing, wsPingPongInterval);
  }
}
