// Принимает темплейт, заменяет переменные в темплейте на значения
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

    // Итерация по темплейту
    uniqueVariables.forEach((templateMatch:string) => {
      // Очищаем строку и получаем ключ
      const variableKey: string = new StringsCleaner(templateMatch).clean();

      // Получим значение
      const variableValue = this._template.getProp(variableKey);

      // Заменяем все вхождения в темплейте
      template = template.replaceAll(templateMatch, variableValue);
    });

    // Если вхождений не будет, мы вернем изначальную строку
    this._template.set(template);
  }
}

export default Parser;
