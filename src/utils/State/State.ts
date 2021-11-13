// Управляет хранилищем приложения
// Тип для событий
type TEvents = {
  [key: string]: string
};

// Тип пропсов, ключ текст, значения могут быть функцией, строкой, числом, или другим классом
type TProps = { [key: string]: string | Function | number | InstanceType<any> };

class State {
  static EVENTS: TEvents = {
    INIT: 'init',
    ADD: 'add',
    SET: 'set',
  }

  private static __instance: State

  private _state: any

  constructor() {
    // 1) Синглтон, сущесвует лишь 1 на приложение
    if (State.__instance) {
      return State.__instance;
    }

    // 3) Записываем в локал сторадж свое состояние
    // и если состояния нет читает локал сторадж
    // 4) Компонент перед рендером получает данные из хранилища
    if (localStorage.getItem('state')) {
      this._state = JSON.parse(<string>localStorage.getItem('state'));
    } else {
      this._state = {};
    }

    State.__instance = this;
  }

  addState(path: string, props: TProps) {
    console.log('Добавляем пропсы формы в глобальный стейт');

    // 5) При обновлении пропсов в хранилище компонент запускает рендер
    this._state[path] = props;
    console.log(this._state);
  }

  // Записывает значения
  set(path: string, value: TProps) {
    // Если такого ключа нет, создадим его
    if (!this._state[path]) {
      this._state[path] = {};
    }

    Object.assign(this._state[path], value);
    console.log(this._state);
    this._backUp();
  }

  // Возвращает значения по пути
  get(path: string) {
    return this._state[path];
  }

  // Удаляет значение по пути
  delete(path: string) {
    this._state[path] = undefined;
  }

  // Записывает данные в локал сторадж
  private _backUp() {
    localStorage.setItem('state', JSON.stringify(this._state));
  }
}

export default State;
