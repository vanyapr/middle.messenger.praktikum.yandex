import Block from '../Block/Block';

interface ICompiler {
  compile(): string, // В данной итерации возвратит строку
}

// TODO:
// 1) Итерируется по темплейту
// 2) При нахождении тега добавляется соответсвтующий элемент
// 2) Учитывает вложенность дочерних компонентов

// Принимает темплейт и данные, возвращает темплейт, заполненный данными
class Compiler implements ICompiler {
  // Строка темплейта
  _template: string;

  template: string;

  // Данные темплейта
  _templateData: any;

  // Регулярное выражение
  _regExp: RegExp;

  constructor(template: string, templateData: {}) {
    this._template = template;
    this._templateData = templateData;
    // Регулярное выражение, которое будет искать вхождения строки с переменными в темплейте
    this._regExp = /{{\s*[\.a-zA-Z0-9]+\s*}}/gi;
  }

  // Заменяем тэги <script> на <!script>
  _escapeScripts = (string:string): string => {
    // Сделаем тупую реализацию чтобы что-то было
    const regExp = /<\s*\/*script|&lt;\s*\/*script/gim;
    return string.replaceAll(regExp, '<!script');
  }

  // Очищает строку от брекетов и пробелов
  _cleanString = (stringWithBrackets: string): string => {
    const result = stringWithBrackets.replace(/[\{\}\s]*/g, '');
    // console.log(result);
    return this._escapeScripts(result);
  }

  // Получение данных для темплейта по ключу объекта (key.subkey.morekeys)
  _getValue = (keyString: string) => {
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
  _fillTemplate = () => {
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

      // Для функции
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
    return template;
  }

  // TODO: Проверка типа данных (точно ли объект?)

  // Компилирует темплейт с использованием встроенных методов
  compile() {
    // Заполняем темплейт данными и возвращаем его
    return this._fillTemplate();
  }
}

export default Compiler;
