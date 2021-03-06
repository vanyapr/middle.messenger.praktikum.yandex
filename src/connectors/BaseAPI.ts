import { apiURL } from '../settings/api';
import HTTPTransport from '../utils/Fetch/Fetch';

// Базовый класс для работы с апи
class BaseAPI {
  http: HTTPTransport

  baseURL: string

  constructor() {
    this.http = new HTTPTransport();
    this.baseURL = apiURL;
  }
}

export default BaseAPI;
