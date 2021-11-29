import { nanoid } from 'nanoid';
import EventBus from '../EventBus/EventBus';
import { Nullable, Values } from './types';

interface BlockMeta<P = any> {
  tagName: string,
  className: string,
  props: P
}

type Events = Values<typeof Block.EVENTS>;

// TODO: передавать в конструктор класс элемента
export default class Block<Props = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  eventBus: () => EventBus;

  protected readonly props: Props;

  private readonly _meta: BlockMeta;

  id = nanoid(6);

  /** JSDoc
   * @param {Object} props
   * @param {string} tagName
   * @param {string} className
   *
   * @returns {void}
   */
  constructor(props?: Props, tagName: string = 'div', className: string = '') {
    const eventBus = new EventBus<Events>();

    this._meta = {
      props,
      tagName,
      className,
    };

    this.props = this._makePropsProxy(props!);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  protected _element: Nullable<HTMLElement> = null;

  get element() {
    return this._element;
  }

  _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName, className } = this._meta;
    this._element = this._createDocumentElement(tagName);

    // Если передан класс элемента в конструктор, добавим его элементу
    if (className) {
      this._element.classList.add(this._meta.className);
    }
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM, this.props);
  }

  _componentDidMount(props: Props) {
    this.componentDidMount(props);
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount(props: Props) {}

  _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {}

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  _render() {
    const fragment = this.render();

    this._removeEvents();
    this.element!.innerHTML = '';

    this.element!.appendChild(fragment);
    this._addEvents();
  }

  getContent() {
    return this.element!;
  }

  _makePropsProxy(props: Props): Props {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в след итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    }) as unknown as Props;
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создает сразу несколько блоков
    return document.createElement(tagName);
  }

  _addEvents() {
    // this.props.events
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  _removeEvents() {
    // this.props.events
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }

  // Отображает на странице компонент (для корневого компонента
  display(): void {}
}
