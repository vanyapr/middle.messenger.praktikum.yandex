import BaseApi from './BaseApi';
import { chats, chatsArchive } from '../settings/api';

class ChatsAPI extends BaseApi {
  private _chats: string

  private _chatsArchive: string

  constructor() {
    super();
    this._chats = this.baseURL + chats;
    this._chatsArchive = this.baseURL + chatsArchive;
  }

  getChats() {
    const options = {
      headers: {
        'content-type': 'application/json',
      },
    };
    return this.http.get(this._chats, options);
  }

  // Создает чат
  createChat(data: Object) {
    const options = {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    return this.http.post(this._chats, options);
  }

  deleteChat(data: Object) {
    const options = {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    return this.http.delete(this._chats, options);
  }
}

export default ChatsAPI;
