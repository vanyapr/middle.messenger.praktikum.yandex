// Принимает темплейт, заменяет переменные в темплейте на значения
import Block from '../Block/Block';
import StringsCleaner from './StringsCleaner'; // Очистка и экранирование строк
import Template from './Template';

interface IParser {
  run(): void;
}

// Заполняет темплейт данными
class Parser implements IParser {
  private _template: Template;

  private readonly _regExp: RegExp

  constructor(template: Template) {
    this._template = template;
    // Вхождения строк с переменными
    this._regExp = /{{\s*[\.a-zA-Z0-9_]+\s*}}/gi;
  }

  // Запускает рендер темплейта
  run(): void {
    this._fillTemplate();
  }

  // Записываем значения в темплейт
  private _fillTemplate(): void {
    let template = this._template.getString();

    // Получили список переменных из итератора возвращенного методом matchAll
    const variablesToReplace = [...template.matchAll(this._regExp)];

    // Чтобы не итерироваться повторно, преобразуем массив в Set с уникальными значениями
    const uniqueVariables = new Set(variablesToReplace.map((array: RegExpMatchArray) => array[0]));

    // Альтернативная итерация по темплейту
    uniqueVariables.forEach((templateMatch:string) => {
      // Очищаем строку и получаем ключ
      const variableKey: string = new StringsCleaner(templateMatch).clean();

      // Получим значение
      const variableValue = this._template.getProp(variableKey);

      // Фоллбэк на случай, если будет передана функция
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
          const childrenTemplate: any = variableValue.render();
          // 1) Получаем листенеры из темплейта
          const templateListeners = childrenTemplate.getListeners();
          // 2) Передаем листенеры в текущий объект (наследуем)
          this._template.setListeners({ ...this._template.getListeners(), ...templateListeners });
          // 3) Получаем рендер из темплейта
          const templateRenderedMarkdown = childrenTemplate.getString();
          // 4) Производим замены
          template = template.replaceAll(templateMatch, templateRenderedMarkdown);
        } else if (variableValue === null) {
          template = template.replaceAll(templateMatch, '');
        } else {
          throw new Error('Неверный аргумент: дочерний элемент не является экземпляром блока');
        }
      }

      // Заменяем все вхождения в темплейте
      template = template.replaceAll(templateMatch, variableValue);
    });

    // Если вхождений не будет, мы вернем изначальную строку
    this._template.set(template);
  }
}

export default Parser;
