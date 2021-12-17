import BaseApi from './BaseApi';
import { chats, chatsArchive, chatsUsers } from '../settings/api';

class ChatsAPI extends BaseApi {
  private _chats: string

  private _chatsArchive: string

  private _chatsUsers: string

  constructor() {
    super();
    this._chats = this.baseURL + chats;
    this._chatsArchive = this.baseURL + chatsArchive;
    this._chatsUsers = this.baseURL + chatsUsers;
  }

  // Получить список чатов
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

  // Удалить чат
  deleteChat(data: Object) {
    const options = {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    return this.http.delete(this._chats, options);
  }

  // Добавить юзеров в чат
  addUsersToChat(data: Object) {
    const options = {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    return this.http.put(this._chatsUsers, options);
  }

  // Получить список юзеров в чате по id чата
  getChatUsersList(id: number) {
    const options = {
      headers: {
        'content-type': 'application/json',
      },
    };

    const requestUrl = `${this._chats}/${id}/users`;

    return this.http.get(requestUrl, options);
  }

  // Удалить юзера из чата
  deleteUserFromChat(data: Object) {
    const options = {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    return this.http.delete(this._chatsUsers, options);
  }
}

export default ChatsAPI;
