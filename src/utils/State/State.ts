// Управляет хранилищем приложения
// Тип для событий
import EventBus from '../EventBus/EventBus';

type TEvents = {
  [key: string]: string
};

// Тип пропсов, ключ текст, значения могут быть функцией, строкой, числом, или другим классом
type TProps = { [key: string]: string | Function | number | InstanceType<any> };

class State {
  static EVENTS: TEvents = {
    INIT: 'init',
    UPDATED: 'updated', // Запуск апдейта компонента
  }

  private static __instance: State

  private _state: any

  private eventBus: EventBus

  constructor() {
    // 1) Синглтон, сущесвует лишь 1 экземпляр на приложение
    if (State.__instance) {
      return State.__instance;
    }
    // 2) Записываем в локал сторадж свое состояние
    // и если состояния нет читает локал сторадж
    // 3) Компонент перед рендером получает данные из хранилища
    if (localStorage.getItem('state')) {
      this._state = JSON.parse(<string>localStorage.getItem('state'));
    } else {
      this._state = {};
    }

    this.eventBus = new EventBus();

    State.__instance = this;

    this.init();
  }

  init() {
    this.eventBus.on(State.EVENTS.INIT, this.init.bind(this));
    this.eventBus.on(State.EVENTS.UPDATED, this.onUpdate.bind(this));
  }

  // Записывает стейт без вызова эффекта (статическое хранилище)
  addState(path: string, props: TProps) {
    // 5) При обновлении пропсов в хранилище компонент запускает рендер
    this._state[path] = props;
  }

  // Регистрирует эффект по ключу (вызывается при записи значений)
  registerComponent(path: string, updateFunction: any) {
    this.eventBus.on(path, updateFunction);
  }

  onUpdate(path: string) {
    this.eventBus.emit(path);
  }

  // Записывает стейт с вызовом эффекта
  set(path: string, value: TProps) {
    // Если такого ключа нет, создадим его
    if (!this._state[path]) {
      console.log('Такого ключа нет, создадим');
      this._state[path] = {};
    }

    Object.assign(this._state[path], value);
    this._backUp();
    this.eventBus.emit(State.EVENTS.UPDATED, path);
  }

  // Получает значение стейта по ключу
  get(path: string) {
    return this._state[path];
  }

  // Удаляет значение по ключу
  delete(path: string) {
    this._state[path] = undefined;
    this._backUp();
  }

  // Уничтожает стейт
  destroy() {
    localStorage.removeItem('state');
    this._state = {};
  }

  log() {
    console.log(this._state);
  }

  // Записывает данные в localstorage
  private _backUp() {
    localStorage.setItem('state', JSON.stringify(this._state));
  }
}

export default State;
