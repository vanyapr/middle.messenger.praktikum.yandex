// PUT, POST, DELETE
const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

function queryStringify(data: string): string | void {
  if (typeof data === 'object') {
    // Можно делать трансформацию GET-параметров в отдельной функции
    const flatObject = Object.keys(data).map((key) => `${key}=${data[key]}`);

    const queryString = flatObject.reduce((concatenation, pair, index) => {
      let prefix = '';
      if (index > 0) {
        prefix = '&';
      }
      // eslint-disable-next-line no-param-reassign
      concatenation += prefix + pair;
      return concatenation;
    }, '?');

    return queryString;
  }

  return '';
}

type TOptions = {
  timeout?: number,
  headers?: Record<string, any>,
  data?: any,
}

// Класс для взаимодействием с апи
class HTTPTransport {
  get = (url: string, options: TOptions = {}) => {
    // Преобразовать данные к строке запроса и добавить к урл адресу
    const { data } = options;

    // Преобразовали данные в строку
    const requestQuery = queryStringify(data);

    // Прибавили к адресу строку запроса
    const requestUrl = url + requestQuery;

    return this.request(requestUrl, { ...options, method: METHODS.GET }, options.timeout);
  };

  // DELETE
  // eslint-disable-next-line max-len
  delete = (url: string, options: TOptions = {}): Promise<unknown> => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout)

  // POST
  // eslint-disable-next-line max-len
  post = (url: string, options: TOptions = {}): Promise<unknown> => this.request(url, { ...options, method: METHODS.POST }, options.timeout)

  // PUT
  // eslint-disable-next-line max-len
  put = (url: string, options: TOptions = {}): Promise<unknown> => this.request(url, { ...options, method: METHODS.PUT }, options.timeout)

  // options:
  // headers — obj
  // data — obj
  request = (url: string, options: Record<string, any>, timeout = 5000): Promise<unknown> => {
    // Получаем данные из опций
    const { headers, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      // Передаем в запросе куки
      xhr.withCredentials = true;

      if (headers) {
        // Установим заголовики пройдя по ключам объекта
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      // Установили таймаут
      xhr.timeout = timeout;

      const onReject = () => {
        reject(new Error('Ошибка соединения'));
      };

      // Обработка ошибок
      xhr.onabort = onReject;
      xhr.ontimeout = onReject;
      xhr.onerror = onReject;

      // Обработка успешной отправки
      xhr.onload = function () {
        resolve(xhr);
      };

      if (method === METHODS.GET && !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}

export default HTTPTransport;
