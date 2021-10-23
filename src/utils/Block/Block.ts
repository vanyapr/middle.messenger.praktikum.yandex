import EventBus from './EventBus';

// Тип для событий
type TEvents = {
  [key: string]: string
};

// Тип пропсов, ключ текст, значения могут быть функцией, строкой, числом, или другим классом
type TProps = {[key: string]: string | Function | number | InstanceType<any> };

// Публичные методы
interface IBlock {
  init(): void,
  componentDidMount(oldProps?: TProps): void,
  componentDidUpdate(oldProps: TProps, newProps: TProps):void
  // render(): string | void,
  setProps(newProps: TProps): void,
}

// Класс должен принимать в конструктор темплейт, и пропсы, рендер
// 1) Создается разметка +
// 2) Вешаются листенеры изменения пропсов
// 3) Возвращается разметка с листенерами
export default class Block implements IBlock {
  private static instance: Block;

  // Делаем синглтон, чтобы рендер срабатывал даже при вызове вложенных классов
  public static getInstance(): Block {
    if (!Block.instance) {
      Block.instance = new Block();
    }

    return Block.instance;
  }

  // Статическое поле общее для всех экземпляров класса
  static EVENTS: TEvents = {
    INIT: 'init',
    COMPONENT_DID_MOUNT: 'component-did-mount',
    COMPONENT_DID_UPDATE: 'component-did-update',
    RENDER: 'render',
  };

  // Поле для элемента
  _element: string | null = null;

  // Поле для пропсов
  props: object;

  // Экземпляр эвентбаса
  eventBus: any;

  // Компилятор темплейта
  container: string | null;

  // Кеш пропсов компонента
  _meta: {};

  constructor(props: TProps = {}, container: string | null = null) {
    // Объявили экземпляр эвент баса
    this.eventBus = new EventBus();

    // Кеш пропсов
    this._meta = {};

    // Селектор контейнера
    this.container = container;

    // Создали прокси из пропсов, переданных в конструктор
    this.props = this._makePropsProxy(props);

    // Передали эвент бас в метод класса (зачем?)
    this._registerEvents();

    // Выполнили эвент инициализации
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(): void {
    // Bind this делается потому что функция не стрелочная
    // Здесь объявляются триггеры для вызова события
    this.eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    this.eventBus.on(Block.EVENTS.COMPONENT_DID_MOUNT, this._componentDidMount.bind(this));
    this.eventBus.on(Block.EVENTS.RENDER, this._render.bind(this));
    // Апдейт компонента
    this.eventBus.on(Block.EVENTS.COMPONENT_DID_UPDATE, this._componentDidUpdate.bind(this));
  }

  // 1
  init() {
    console.log('Init');
    // Заэмитили событие в эвент басе (монтирование компонента)
    this.eventBus.emit(Block.EVENTS.COMPONENT_DID_MOUNT);
  }

  // 3
  _componentDidMount() {
    console.log('component Did Mount');
    // Вызвали монтирование компонента
    this.componentDidMount();

    // Заэмитили рендер компонента
    this.eventBus.emit(Block.EVENTS.RENDER);
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount() {}

  // Эмитится когда обновляются пропсы
  _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    console.log('component Did Update');
    // Как сюда передать прошлые состояния пропсов?
    const response = this.componentDidUpdate(oldProps, newProps);

    // Если значения в объекте изменились
    console.log(response);
    if (response) {
      console.log('Апдейт пропсов');
      // 1) Запишем "текущие значения" в кеш this._meta
      this._meta = Object.assign(this._meta, this.props);
      // 2) Вызовем перерендер
      this._render();
    } else {
      console.log('Нечего обновлять');
    }
  }

  // Может переопределять пользователь
  componentDidUpdate(oldProps: {}, newProps: {}) {
    console.log(oldProps, newProps);
    // Функция сравнения компонентов
    function isUpdateRequired(object1: TProps, object2: TProps) {
      // Если разное число лючей, вернет true
      if (Object.keys(object1).length !== Object.keys(object2).length) {
        return true;
      }
      const result = Object.keys(object1).every((key:string) => object1[key] === object2[key]);
      return !result;
    }

    // Определим сравнение пропсов, чтобы не запускать перерендер зря
    return isUpdateRequired(oldProps, newProps);
  }

  // Устанавливаем новые пропсы
  setProps = (nextProps: TProps) => {
    if (!nextProps) {
      return;
    }

    // Этот метод вызывает перезапись первого объекта свойствами второго
    Object.assign(this.props, nextProps);
  };

  // Вызываем рендер элемента
  _render() {
    console.log('Вызвали рендер');
    console.log(this.container);
    // Создаст блок
    this.render();
  }

  // Может переопределять пользователь, необязательно трогать
  render(): void {}

  _makePropsProxy(props: TProps) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    console.log('Срабатывание прокси');

    // Создаем прокси и записываем в this.props
    return new Proxy(props, {
      // Перехватываем сеттер
      set(target: TProps, property: string, value, reciever) {
        // Перезаписали пропсы в целевом объекте
        // eslint-disable-next-line no-param-reassign
        target[property] = value;

        // Заэмитили событие, которое не сработает???
        // eslint-disable-next-line max-len
        self.eventBus.emit(Block.EVENTS.COMPONENT_DID_UPDATE, self._meta, reciever);

        // Возвратим true как того требует метод
        return true;
      },

      deleteProperty() {
        throw new Error('Отказано в доступе');
      },
    });
  }
}
