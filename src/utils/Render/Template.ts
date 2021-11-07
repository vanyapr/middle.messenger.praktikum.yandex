type TListeners = {
  [key: string]: {
    type: string,
    method: any
  }
}

interface ITemplate {
  getProp(keyString: string): any;
  get(): string;
  set(value: string): void;
  setListeners(listeners: TListeners): void;
  getListeners(): TListeners;
}

// Принимает темплейт и пропсы, возвращает экземпляр с методами и данными
class Template implements ITemplate {
  // Строка темплейта
  private _template: string;

  private _listeners: TListeners

  // Данные темплейта
  private readonly _templateData: any;

  constructor(template: string, templateData: {}) {
    this._template = template;
    this._templateData = templateData;
    this._listeners = {};
  }

  // Получение данных для темплейта по ключу объекта (key.subkey.morekeys)
  getProp = (keyString: string): any => {
    const keysArray = keyString.split('.');
    const templateData = this._templateData;

    // Выполняем поиск значения в ключе, вторым аргументом передаем объект
    return keysArray.reduce((dataObject, objectKey) => {
      // Если ключа нет, вернём undefined, потому что у undefined нельзя получить ключ (не объект)
      if (dataObject[objectKey] === undefined) {
        return undefined;
      }

      // Если в объекте есть такой ключ, запишем его в аккумулятор
      return dataObject[objectKey];
    }, templateData);
  }

  // Получить темплейт
  get(): string {
    return this._template;
  }

  // Перезаписать строку темплейта
  set(value: string): void {
    this._template = value;
  }

  // Записать слушатели в темплейт
  setListeners(listeners: TListeners): void {
    this._listeners = listeners;
  }

  // Получить объект слушателей темплейта
  getListeners(): TListeners {
    return this._listeners;
  }
}

export default Template;
