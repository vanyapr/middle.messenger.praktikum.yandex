import { json } from 'express';
import { signUp, signIn, getUser, logOut } from '../settings/api';
import BaseApi from './BaseApi';

// Регистрация пользователя
class Auth extends BaseApi {
  private _signUpURL: string

  private _signInURL: string

  private _getUserURL: string

  private _logOutURL: string

  constructor() {
    super();
    this._signUpURL = this.baseURL + signUp;
    this._signInURL = this.baseURL + signIn;
    this._getUserURL = this.baseURL + getUser;
    this._logOutURL = this.baseURL + logOut;
  }

  signUp(data: Object) {
    const options = {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    return this.http.post(this._signUpURL, options);
  }

  signIn(data: Object) {
    const options = {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    return this.http.post(this._signInURL, options);
  }

  getUser() {
    return this.http.get(this._getUserURL, {});
  }

  logOut() {
    return this.http.post(this._logOutURL, {});
  }
}

export default Auth;
