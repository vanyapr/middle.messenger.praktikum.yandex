import BaseAPI from './BaseAPI';
import { findUser, saveAvatar, savePassword, saveProFile } from '../settings/api';

class User extends BaseAPI {
  private _savePasswordURL: string;

  private _saveProfileURL: string

  private _saveAvatardURL: string

  private _findUserURL: string

  constructor() {
    super();
    this._saveProfileURL = this.baseURL + saveProFile;
    this._savePasswordURL = this.baseURL + savePassword;
    this._saveAvatardURL = this.baseURL + saveAvatar;
    this._findUserURL = this.baseURL + findUser;
  }

  // Сохранить данные юзера
  saveProfile(data: Object) {
    const options = {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(data),
    };
    return this.http.put(this._saveProfileURL, options);
  }

  // Изменить пароль
  changePassword(data: Object) {
    const options = {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    return this.http.put(this._savePasswordURL, options);
  }

  // Изменить аватар
  changeAvatar(data: FormData) {
    // Не указываем заголовки запроса для корректной работы
    const options = {
      data,
    };

    return this.http.put(this._saveAvatardURL, options);
  }

  // Найти пользователя по логину
  findUserByLogin(login: string) {
    console.log(login);
    const options = {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(login),
    };
    return this.http.post(this._findUserURL, options);
  }
}

export default User;
