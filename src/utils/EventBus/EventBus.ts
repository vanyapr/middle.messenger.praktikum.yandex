// Тип листенеров
type TListeners = {
  [key: string]: any
}

// Интерфейс эвентбаса
interface IEventBus {
  on(eventName: string, callBack: Function): void,
  off(eventName: string, callBack: Function): void,
  emit(eventName: string, arg?: [any]): void,
}

export default class EventBus implements IEventBus {
  // Содержит идентификаторы событий в виде строк, коллбэк может быть любым
  private _listeners: TListeners;

  constructor() {
    this._listeners = {};
  }

  // Добавляем событие в список событий
  on(eventName: string, callBack: Function): void {
    // Если такого ключа нет, создадим пустой массив на его месте
    if (!this._listeners[eventName]) {
      this._listeners[eventName] = [];
    }

    // Добавим в массив новый элемент
    this._listeners[eventName].push(callBack);
  }

  // Удаляем событие из списка событий
  off(eventName: string, callBack: Function): void {
    // Если такого события нет, выкинем ошибку
    if (!this._listeners[eventName]) {
      throw new Error('Ошибка удаления события: такого события не существует.');
    }

    this._listeners[eventName].filter((listener: Function) => listener !== callBack);
  }

  // Вызываем срабатывание события по ключу события
  emit(eventName: string, ...rest: any): void {
    // Если такого события нет, выкинем ошибку
    if (!this._listeners[eventName]) {
      console.log(this._listeners);
      throw new Error(`Ошибка запуска события: ${eventName} такого события не существует.`);
    }

    this._listeners[eventName].forEach((event: Function) => {
      // Вызываем событие, и передаем ему все аргументы, переданные в эмиттер после первого
      event(...rest);
    });
  }
}
