interface ITemplate {
  getProp(keyString: string): any;
  getString(): string;
  set(value: string): void;
}

// Принимает темплейт и пропсы, возвращает экземпляр с методами и данными
class Template implements ITemplate {
  // Строка темплейта
  private _template: string;

  containerSelector: string | null | undefined

  // Данные темплейта
  private readonly _templateData: any;

  constructor(template: string, templateData: {}) {
    this._template = template;
    this._templateData = templateData;
  }

  // Получение данных для темплейта по ключу объекта (key.subkey.morekeys)
  getProp = (keyString: string): any => {
    const keysArray = keyString.split('.');
    const templateData = this._templateData;

    // Выполняем поиск значения в ключе, вторым аргументом передаем строку
    return keysArray.reduce((dataObject, objectKey) => {
      // Если ключа нет, вернём undefined, потому что у undefined нельзя получить ключ (не объект)
      if (dataObject[objectKey] === undefined) {
        return '';
      }

      // FIXME: remove this Фикс на случай NULL
      if (dataObject[objectKey] === null) {
        return 'null';
      }

      // Если в объекте есть такой ключ, запишем его в аккумулятор
      return dataObject[objectKey];
    }, templateData);
  }

  // Получить строку темплейта
  getString(): string {
    return this._template;
  }

  // Перезаписать строку темплейта
  set(value: string): void {
    this._template = value;
  }
}

export default Template;
