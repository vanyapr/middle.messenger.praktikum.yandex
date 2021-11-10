import EventBus from '../EventBus/EventBus';
import Template from '../Render/Template';
import isEqual from '../isEqual';
import Render from '../Render/Render';

// Тип для событий
type TEvents = {
  [key: string]: string
};

// Тип пропсов, ключ текст, значения могут быть функцией, строкой, числом, или другим классом
type TProps = { [key: string]: string | Function | number | InstanceType<any> };

// Публичные методы
interface IBlock {
  init(): void,

  componentDidMount(oldProps?: TProps): void,

  componentDidUpdate(oldProps: TProps, newProps: TProps): void

  setProps(newProps: TProps): void,
}

// Обеспечивает рендер элемента, не может быть объявлен напрямую
export default abstract class Block implements IBlock {
  // Статическое поле общее для всех экземпляров класса
  static EVENTS: TEvents = {
    INIT: 'init',
    COMPONENT_DID_MOUNT: 'component-did-mount',
    COMPONENT_DID_UPDATE: 'component-did-update',
    RENDER: 'render',
    DISPLAY_HTML: 'display-html',
    ADD_LISTENERS: 'add-listeners',
  }

  // Поле для пропсов
  props: object

  // Экземпляр эвентбаса
  eventBus: any

  // Компилятор темплейта
  container: string | null

  // Темплейт который мы получим при рендере
  _template: Template

  // Кеш пропсов компонента
  private _meta: {}

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

  // 1
  init() {
    // Заэмитили событие в эвент басе (монтирование компонента)
    this.eventBus.emit(Block.EVENTS.COMPONENT_DID_MOUNT);
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount() {
  }

  // Может переопределять пользователь
  componentDidUpdate(oldProps: {}, newProps: {}) {
    return isEqual(oldProps, newProps);
  }

  // Устанавливаем новые пропсы
  setProps = (nextProps: TProps) => {
    if (!nextProps) {
      return;
    }

    // Этот метод вызывает перезапись первого объекта свойствами второго
    // Также он вызывает сайд эффект
    Object.assign(this.props, nextProps);
  }

  // Может переопределять пользователь, необязательно трогать
  render(): Template {
    return this._template;
  }

  // Отображает блок
  show(): void {
    // FIXME: Как теперь будут обновляться пропсы у компонента?
    this.eventBus.emit(Block.EVENTS.DISPLAY_HTML);
  }

  private _registerEvents(): void {
    // Bind this делается потому что функция не стрелочная
    // Здесь объявляются триггеры для вызова события
    this.eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    this.eventBus.on(Block.EVENTS.COMPONENT_DID_MOUNT, this._componentDidMount.bind(this));
    this.eventBus.on(Block.EVENTS.RENDER, this._render.bind(this));
    // Апдейт компонента
    this.eventBus.on(Block.EVENTS.COMPONENT_DID_UPDATE, this._componentDidUpdate.bind(this));
    this.eventBus.on(Block.EVENTS.DISPLAY_HTML, this._addHtml.bind(this));
    this.eventBus.on(Block.EVENTS.ADD_LISTENERS, this._setListeners.bind(this));
  }

  // 3
  private _componentDidMount() {
    // Вызвали монтирование компонента
    this.componentDidMount();

    // Заэмитили рендер компонента
    this.eventBus.emit(Block.EVENTS.RENDER);
  }

  // Эмитится когда обновляются пропсы
  private _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    // Как сюда передать прошлые состояния пропсов?
    const response = this.componentDidUpdate(oldProps, newProps);

    // Если значения в объекте изменились
    if (!response) {
      // 1) Запишем "текущие значения" в кеш this._meta
      this._meta = Object.assign(this._meta, this.props);
      // 2) Вызовем перерендер
      this._render();
      console.log('Повторный рендер компонента');
      this.show();
    }
  }

  private _makePropsProxy(props: TProps) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    // Создаем прокси и записываем в this.props
    return new Proxy(props, {
      // Перехватываем сеттер
      set(target: TProps, property: string, value, reciever) {
        console.log('Сработал сайд эффект');
        // Перезаписали пропсы в целевом объекте
        // eslint-disable-next-line no-param-reassign
        target[property] = value;

        // Заэмитили событие
        self.eventBus.emit(Block.EVENTS.COMPONENT_DID_UPDATE, self._meta, reciever);

        // Возвратим true как того требует метод
        return true;
      },

      deleteProperty() {
        throw new Error('Отказано в доступе');
      },
    });
  }

  // Устанавливает слушатели в отрендеренный темплейт
  private _setListeners() {
    const listenersList = Object.entries(this._template.getListeners());

    listenersList.forEach(([key, value]) => {
      // Вычислим селектор элемента на основании объекта
      const query = `[data-${value.type}="${key}"]`;

      // Получим элемент
      const elements = document.querySelectorAll(query);

      if (elements.length) {
        elements.forEach((element) => {
          // Если элемент найден, повесим на него слушатель
          element.addEventListener(value.type, value.method);
          // Удалим аттрибут потому что можем (эта работа с дом нереально медленная)
          element.removeAttribute(`data-${value.type}`);
        });
      }
    });
  }

  // Отображает элемент на странице
  private _addHtml() {
    const compiledTemplate = this._template.get();
    // Вызываем рендер
    new Render(this._template.containerSelector).render(compiledTemplate);

    // Вызовем добавление слушателей
    this.eventBus.emit(Block.EVENTS.ADD_LISTENERS);
  }

  // Вызываем рендер элемента
  private _render() {
    // Создаст блок
    this._template = this.render();
  }
}
