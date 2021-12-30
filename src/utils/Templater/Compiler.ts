// @ts-ignore
import EventBus from '../EventBus/EventBus';
import Template from './Template';
import Parser from './Parser';

type TEvents = {
  [key: string]: string
};

// Возвратит строку темплейта и объект листенеров
interface ICompiler {
  compile(): Template
}

// Принимает строку темплейта и данные, возвращает темплейт заполненный данными
class Compiler implements ICompiler {
  static EVENTS: TEvents = {
    INIT: 'init',
    COLLECT_EVENTS: 'collectEvents',
    RENDER: 'render',
  };

  // Строка темплейта
  private _template: Template;

  // Экземпляр эвентбаса
  eventBus: any;

  constructor(template: string, templateData: Record<string, any>) {
    // Создаем экземпляр темплейта
    this._template = new Template(template, templateData);

    // Объявили экземпляр эвент баса
    this.eventBus = new EventBus();

    // Объявили события в эвент басе
    this._registerEvents();

    // Выполнили эвент инициализации
    this.eventBus.emit(Compiler.EVENTS.INIT);
  }

  private _registerEvents(): void {
    // Bind this делается потому что функция не стрелочная
    // Здесь объявляются триггеры для вызова события
    this.eventBus.on(Compiler.EVENTS.INIT, this.init.bind(this));
    this.eventBus.on(Compiler.EVENTS.FILL_DATA, this._fillTemplate.bind(this));
  }

  // 1 Старт эвент баса
  init() {
    // Заэмитили событие в эвент басе (монтирование компонента)
    this.eventBus.emit(Compiler.EVENTS.FILL_DATA);
  }

  // 3) Запишем значения переменных в темплейт
  private _fillTemplate() {
    // Заполнили темплейт данными
    new Parser(this._template).run();
  }

  // Возвратим заполненный темплейт
  compile(): Template {
    return this._template;
  }
}

export default Compiler;
