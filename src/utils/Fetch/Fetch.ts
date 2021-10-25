// Fetch
// Реализуйте класс для работы с запросами, который:
// Содержит методы GET, PUT, POST, DELETE;
// В методе GET data трансформируется в формат GET-запроса ?key1=value1&key2=value2;
// По таймауту выбрасывает ошибку;
// Умеет работать с пользовательскими заголовками;
// После успешного ответа — необходимо возвращать в промисе сам XHR, то есть разрезолвить XHR;
// Объект options должен содержать:
//   timeout — время на запрос. Если запрос выполняется дольше указанного времени, должен быть reject;
// data — возможность работы с информацией: GET-параметры и JSON;
// headers — объект, для описания заголовков, у которого ключ и значение всегда string.

// PUT, POST, DELETE
const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data: string): string | void {
  if (typeof data === 'object') {
    // Можно делать трансформацию GET-параметров в отдельной функции
    const flatObject = Object.keys(data).map((key) => `${key}=${data[key]}`);

    console.log(flatObject);

    // console.log(concatObject);

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

  // PUT, POST, DELETE
  delete = (url: string, options: TOptions = {}): Promise<unknown> => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout)

  // PUT, POST, DELETE
  post = (url: string, options: TOptions = {}): Promise<unknown> => this.request(url, { ...options, method: METHODS.POST }, options.timeout)

  // PUT, POST, DELETE
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

      if (headers) {
        // Установим заголовики пройдя по ключам объекта
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      // Установили таймаут
      xhr.timeout = timeout;

      const onReject = () => {
        reject();
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
