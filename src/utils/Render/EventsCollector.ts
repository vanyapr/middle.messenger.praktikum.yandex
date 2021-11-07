// @ts-ignore
import { v4 as makeUUID } from 'uuid'; // Модуль для простановки UUID
import StringsCleaner from './StringsCleaner'; // Очистка и экранирование строк
import Template from './Template'; // Темплейт

type TListeners = {
  [key: string]: {
    type: string,
    method: any
  }
}

interface IEventsCollector {
  run(): void
}

// Собирает события по on*, возвращает строку темплейта и список событий в объекте
class EventsCollector implements IEventsCollector {
  private _template: Template

  private _listeners: TListeners

  private readonly _regExp: RegExp

  constructor(template: Template) {
    this._template = template;
    this._listeners = {};

    // Регулярное выражение которое будет искать объявление событий на элементах
    this._regExp = /on[a-zA-Z]+=("|')\s*{{\s*[a-zA-Z]+\s*}}("|')/gi;
  }

  // Возвращает массив со списком слушателей
  private _collectListenersNames() {
    const template = this._template.get();
    // Получим все имена слушателей из темплейта
    // образец: ... onclick="{{a}}" onSubmit='{{ b }}' => ['onclick="{{a}}"', 'onSubmit="{{ b }}"']
    return [...template.matchAll(this._regExp)].map((array: RegExpMatchArray) => array[0]);
    // TODO: Чтобы не итерироваться повторно, преобразовать массив в Set с уникальными значениями
  }

  // Собираем вызовы событий
  private _collectListeners() {
    // Получили список переменных из итератора возвращенного методом matchAll
    const variablesToReplace = this._collectListenersNames();

    // eslint-disable-next-line max-len
    const processedTemplate = variablesToReplace.reduce((templateString:string, uniqueVariable: string) => {
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
        // Заменим вхождения на data-[тип события]-uuid
        const replace = `data-${eventType[0]}'${uuid}'`;
        result = templateString.replaceAll(uniqueVariable, replace);
      } else {
        throw new Error('Не удалось вычислить тип события');
      }

      // Получили ключ, по которому получим функцию
      const variableBrackets = uniqueVariable.match(this._regExp);

      if (variableBrackets) {
        // Саму функцию запишем в объект под идентификатором {УНИКАЛЬНЫЙ ID: { метод, тип}}
        if (!this._listeners[uuid]) {
          // Получим тип события
          const type = eventType[0].replace('=', '');

          // Вхождения строк с переменными
          const methodRegexp = /{{\s*[\.a-zA-Z0-9]+\s*}}/gi;
          const matchedProps = variableBrackets[0].match(methodRegexp);

          if (matchedProps) {
            const propToParse = matchedProps[0];
            const variableKey = new StringsCleaner(propToParse).clean();
            const method = this._template.getProp(variableKey);
            // Добавили событие по ключу
            this._listeners[uuid] = {
              method,
              type,
            };
          }
        }
      } else {
        throw new Error('Не удалось вычислить переменную в шаблоне');
      }

      return result;
    }, this._template.get());

    // Перезаписали состояние темплейта
    this._template.set(processedTemplate);
    this._template.setListeners(this._listeners);
  }

  run(): void {
    this._collectListeners();
  }
}

export default EventsCollector;
