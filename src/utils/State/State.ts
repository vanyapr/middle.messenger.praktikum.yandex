// Управляет хранилищем приложения
import EventBus from '../EventBus/EventBus';
// Тип для событий
type TEvents = {
  [key: string]: string
};

// Тип пропсов, ключ текст, значения могут быть функцией, строкой, числом, или другим классом
type TProps = { [key: string]: string | Function | number | InstanceType<any> };

class State {
  static EVENTS: TEvents = {
    INIT: 'init',
  }

  private static __instance: State

  private _state: any

  private _eventBus: EventBus

  constructor() {
    // 1) Синглтон, сущесвует лишь 1 на приложение
    if (State.__instance) {
      return State.__instance;
    }
    // 2) Для избегания рейс кондишенов работает по эвент басу
    this._eventBus = new EventBus();

    // 3) Записываем в локал сторадж свое состояние
    // и если состояния нет читает локал сторадж
    if (localStorage.getItem('state')) {
      this._state = JSON.parse(localStorage.getItem('state'));
    } else {
      this._state = {};
    }

    // 4) Компонент перед рендером получает данные из хранилища

    // 5) При обновлении пропсов в хранилище компонент запускает рендер
    State.__instance = this;
  }

  doTheStuff(props: TProps, path: string) {
    console.log('Делаем нужные штуки');

    this._state[path] = props;
    console.log(this._state);
  }

  // Записывает значения
  set(path: string, value: any) {
    Object.assign(this._state[path], value);
    console.log(this._state);
    this._backUp();
  }

  // Возвращает значения по пути
  get(path: string) {
    return this._state[path];
  }

  // Записывает данные в локал сторадж
  private _backUp() {
    localStorage.setItem('state', JSON.stringify(this._state));
  }

  // Объявляет события эвентбас
  private _init() {
    this._eventBus.on(State.EVENTS.INIT, this.doTheStuff.bind(this));
  }

  // Запускает жизненный цикл стейта
  private _emit() {

  }
}

export default State;
