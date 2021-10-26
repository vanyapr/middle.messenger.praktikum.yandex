// @ts-ignore
import { v4 as makeUUID } from 'uuid';
import Block from '../Block/Block';
import EventBus from '../EventBus/EventBus';

type TListeners = {
  [key: string]: {
    type: string,
    method: any
  }
}

// Возвратит строку темплейта и объект листенеров
interface ICompiler {
  compile(): { compiledTemplate: string; listeners: TListeners }
}

type TEvents = {
  [key: string]: string
};

// TODO:
// 1) +Итерируется по темплейту
// 2) +При нахождении тега добавляется соответсвтующий элемент
// 3) +Функции заменить на листенеры
// 4) +Учитывает вложенность дочерних компонентов

// Принимает темплейт и данные, возвращает темплейт, заполненный данными
class Compiler implements ICompiler {
  static EVENTS: TEvents = {
    INIT: 'init',
    COLLECT_EVENTS: 'collectEvents',
    RENDER: 'render',
    COMPILE: 'compile',
  };

  // Строка темплейта
  private _template: string;

  // Данные темплейта
  private _templateData: any;

  // Массив с функциями, которые мы будем вызывать
  private _events: TListeners;

  // Регулярное выражение
  _regExp: RegExp;

  // Регулярное выражение для поиска функций
  _funcRegExp: RegExp;

  // Экземпляр эвентбаса
  eventBus: any;

  constructor(template: string, templateData: {}) {
    this._events = {};
    this._template = template;
    this._templateData = templateData;
    // Регулярное выражение, которое будет искать вхождения строки с переменными в темплейте
    this._regExp = /{{\s*[\.a-zA-Z0-9]+\s*}}/gi;
    // Регулярное выражение которое будет искать объявление событий на элементах
    this._funcRegExp = /on[a-zA-Z]+=("|')\s*{{\s*[a-zA-Z]+\s*}}("|')/gi;

    // Объявили экземпляр эвент баса
    this.eventBus = new EventBus();

    // Передали эвент бас в метод класса (зачем?)
    this._registerEvents();

    // Выполнили эвент инициализации
    this.eventBus.emit(Compiler.EVENTS.INIT);
  }

  private _registerEvents(): void {
    // Bind this делается потому что функция не стрелочная
    // Здесь объявляются триггеры для вызова события
    this.eventBus.on(Compiler.EVENTS.INIT, this.init.bind(this));
    this.eventBus.on(Compiler.EVENTS.COLLECT_EVENTS, this._collectListeners.bind(this));
    this.eventBus.on(Compiler.EVENTS.RENDER, this._fillTemplate.bind(this));
    this.eventBus.on(Compiler.EVENTS.COMPILE, this.compile.bind(this));
  }

  // 1
  init() {
    // Заэмитили событие в эвент басе (монтирование компонента)
    this.eventBus.emit(Compiler.EVENTS.COLLECT_EVENTS);
  }

  // Заменяем тэги <script> на <!script>
  private _escapeScripts = (string:string): string => {
    // Сделаем тупую реализацию чтобы что-то было
    const regExp = /<\s*\/*script|&lt;\s*\/*script/gim;
    return string.replaceAll(regExp, '<!script');
  }

  // Очищает строку от брекетов и пробелов
  private _cleanString = (stringWithBrackets: string): string => {
    const result = stringWithBrackets.replace(/[\{\}\s]*/g, '');
    return this._escapeScripts(result);
  }

  // Получение данных для темплейта по ключу объекта (key.subkey.morekeys)
  private _getValue = (keyString: string) => {
    const keysArray = keyString.split('.');
    const templateData = this._templateData;

    // Выполняем поиск значения в ключе, вторым аргументом передаем объект
    return keysArray.reduce((dataObject, objectKey) => {
      // Если ключа нет, вернём undefined, потому что у undefined нельзя получить ключ (не объект)
      if (dataObject[objectKey] === undefined) {
        return undefined;
      }

      // Если в объекте есть такой ключ, запишем его в аккумулятор
      return dataObject[objectKey];
    }, templateData);
  }

  // Запишем значения в темплейт
  private _fillTemplate = () => {
    let template = this._template;
    const regularExpression = this._regExp;
    const getValue = this._getValue;

    // Получили список переменных из итератора возвращенного методом matchAll
    // Чтобы не итерироваться повтороно, преобразуем массив в Set с уникальными значениями
    const variablesToReplace = [...template.matchAll(regularExpression)];

    const uniqueVariables = new Set(variablesToReplace.map((array) => array[0]));

    // Альтернативная итерация по темплейту
    uniqueVariables.forEach((templateMatch:string) => {
      // Очищаем строку от кавычек для получения ключа
      const variableKey: string = this._cleanString(templateMatch);

      // Для найденной переменной мы получаем значение, после чего в темплейте выполняем замену
      const variableValue = getValue(variableKey);

      if (typeof variableValue === 'function') {
        // Записываем функцию в объект window

        // @ts-ignore
        window[variableKey] = variableValue;
        // Заменяем все вхождения в темплейте
        template = template.replaceAll(templateMatch, `${variableKey}()`);
      }

      // Если это вложенный компонент
      if (typeof variableValue === 'object') {
        // Если это экземпляр блока, то выполним рендер
        if (variableValue instanceof Block) {
          const renderedTemplate: any = variableValue.render();
          template = template.replaceAll(templateMatch, renderedTemplate);
        } else {
          throw new Error('Неверный аргумент: дочерний элемент не является экземпляром блока');
        }
      }

      // Заменяем все вхождения в темплейте
      template = template.replaceAll(templateMatch, variableValue);
    });

    // Если вхождений не будет, мы вернем изначальную строку
    this._template = template;

    this.eventBus.emit(Compiler.EVENTS.COMPILE);
  }

  // Собираем вызовы событий
  private _collectListeners() {
    // Создаем регулярное выражение, которое будет находить вхождения
    // образец: ... onclick="{{a}}" onSubmit=' {{ b }}'

    const template = this._template;
    const regularExpression = this._funcRegExp;

    // Получили список переменных из итератора возвращенного методом matchAll
    // Чтобы не итерироваться повтороно, преобразуем массив в Set с уникальными значениями
    const variablesToReplace = [...template.matchAll(regularExpression)].map((array) => array[0]);

    const processedTemplate = variablesToReplace.reduce((templateString, uniqueVariable) => {
      let result = '';

      // Мы запишем на место вызова идентификатор блока
      // как data-{УНИКАЛЬНЫЙ ID}
      // По идентификатору блока будем вешать листенеры при рендере
      const uuid = makeUUID(); // '23a91df9-2a89-4357-b297-ec2924d854e3'

      // Получим из строки подстроку с типом события для data-event
      const eventTypeRegexp = /[^on][a-zA-Z]+=/gim;
      // Вернет строку вида 'onclick='
      const eventType = uniqueVariable.match(eventTypeRegexp);

      if (eventType) {
        // Заменим вхождения в темплейт на тэг data
        const replace = `data-${eventType[0]}'${uuid}'`;
        result = templateString.replaceAll(uniqueVariable, replace);
      } else {
        throw new Error('Не удалось вычислить тип события');
      }

      // Получили ключ, по которому получим функцию
      const variableBrackets = uniqueVariable.match(this._regExp);

      if (variableBrackets) {
        const variableKey = this._cleanString(variableBrackets[0]);

        // Саму функцию запишем в объект под идентификатором {УНИКАЛЬНЫЙ ID: функция}
        // После рендера для всего объекта идентификаторов выполним добавление событий
        if (!this._events[uuid]) {
          const type = eventType[0].replace('=', '');

          const method = this._getValue(variableKey);

          // Добавили событие по ключу
          this._events[uuid] = {
            method,
            type,
          };
        }
      } else {
        throw new Error('Не удалось вычислить переменную в шаблоне');
      }

      return result;
    }, this._template);

    this._template = processedTemplate;

    // Вызвали заполнение темплейта
    this.eventBus.emit(Compiler.EVENTS.RENDER);
  }

  // Компилирует темплейт с использованием встроенных методов
  compile() {
    // Отсеиваем вызовы функций в темплейте
    const compiledTemplate = this._template;
    const listeners = this._events;

    // Заполняем темплейт данными и возвращаем его
    return { compiledTemplate, listeners };
  }
}

export default Compiler;
