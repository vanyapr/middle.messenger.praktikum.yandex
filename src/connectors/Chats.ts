import BaseApi from './BaseApi';
import { chats, chatsArchive } from '../settings/api';

class Chats extends BaseApi {
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

  getChats2(data: Object) {
    const options = {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(data),
    };
    return this.http.get(this._chats, options);
  }
}

export default Chats;
