import BaseAPI from './BaseAPI';
import { chats, chatsUsers, chatsTokens, chatsMessages } from '../settings/api';

class ChatsAPI extends BaseAPI {
  private _chats: string

  private _chatsMessages: string

  private _chatsUsers: string

  private _chatsTokens: string

  constructor() {
    super();
    this._chats = this.baseURL + chats;
    this._chatsMessages = this.baseURL + chatsMessages;
    this._chatsUsers = this.baseURL + chatsUsers;
    this._chatsTokens = this.baseURL + chatsTokens;
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

  // Получить токен чата
  getChatToken(id: number) {
    const options = {
      headers: {
        'content-type': 'application/json',
      },
    };

    const requestUrl = `${this._chatsTokens}/${id}`;

    return this.http.post(requestUrl, options);
  }

  // Получить число непрочитанных сообщений в чате
  getChatUnreadMessagesCount(id: number) {
    const options = {
      headers: {
        'content-type': 'application/json',
      },
    };

    const requestUrl = `${this._chatsMessages}/${id}`;

    return this.http.post(requestUrl, options);
  }
}

export default ChatsAPI;
