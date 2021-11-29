// Тип листенеров
type Listener<T extends unknown[] = any[]> = (...args: T) => void;

// eslint-disable-next-line max-len
export default class EventBus <EventName extends string = string, M extends { [K in EventName]: unknown[]} = Record<EventName, any[]>> {
  // Содержит идентификаторы событий в виде строк, коллбэк может быть любым
  private _listeners: {[key in EventName]?: Listener<M[EventName]>[]} = {};

  // constructor() {
  //   this._listeners = {[key in E]?: Listener<M[E]>[]} = {};
  // }

  // Добавляем событие в список событий
  on(eventName: EventName, callBack: Listener<M[EventName]>): void {
    // Если такого ключа нет, создадим пустой массив на его месте
    if (!this._listeners[eventName]) {
      this._listeners[eventName] = [];
    }

    // Добавим в массив новый элемент
    this._listeners[eventName]!.push(callBack);
  }

  // Удаляем событие из списка событий
  off(eventName: EventName, callBack: Listener<M[EventName]>): void {
    // Если такого события нет, выкинем ошибку
    if (!this._listeners[eventName]) {
      throw new Error('Ошибка удаления события: такого события не существует.');
    }

    // eslint-disable-next-line max-len
    this._listeners[eventName] = this._listeners[eventName]!.filter((listener) => listener !== callBack);
  }

  // Вызываем срабатывание события по ключу события
  emit(eventName: EventName, ...restOfArgs: any): void {
    // Если такого события нет, выкинем ошибку
    if (!this._listeners[eventName]) {
      console.log(this._listeners);
      throw new Error(`Ошибка запуска события: ${eventName} такого события не существует.`);
    }

    this._listeners[eventName]!.forEach((event: Function) => {
      // Вызываем событие, и передаем ему все аргументы, переданные в эмиттер
      event(...restOfArgs);
    });
  }
}
