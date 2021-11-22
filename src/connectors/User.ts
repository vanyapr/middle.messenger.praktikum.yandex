import BaseApi from './BaseApi';
import { findUser, getUserById, saveAvatar, savePassword, saveProFile } from '../settings/api';

class User extends BaseApi {
  private _savePasswordURL: string;

  private _saveProfileURL: string

  private _saveAvatardURL: string

  private _getUserByIdURL: string

  private _findUserURL: string

  constructor() {
    super();
    this._saveProfileURL = this.baseURL + saveProFile;
    this._savePasswordURL = this.baseURL + savePassword;
    this._saveAvatardURL = this.baseURL + saveAvatar;
    this._getUserByIdURL = this.baseURL + getUserById;
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
}

export default User;