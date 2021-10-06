// Принимает темплейт и данные, возвращает темплейт, заполненный данными
class Compiler {
  constructor(template, templateData) {
    this._template = template;
    this._templateData = templateData;
    // Регулярное выражение, которое будет искать вхождения строки с переменными в темплейте
    this._regExp = /{{\s*[\.a-zA-Z0-9]+\s*}}/gi;
  }

  // Очищает строку от брекетов и пробелов
  _cleanString = (stringWithBrackets) => {
    const result = stringWithBrackets.replace(/[\{\}\s]*/g, '');
    // console.log(result);
    return result;
  }

  // Получение данных для темплейта по ключу объекта (key.subkey.morekeys)
  _getValue = (keyString) => {
    // Разделяем переменную темплейта на отдельные ключи по символу точки
    const keysArray = keyString.split('.');

    // Вопрос ревьюеру: А нужно ли это присвоение? Зачем плодить переменные?
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
    uniqueVariables.forEach((templateMatch) => {
      // Очищаем строку от кавычек для получения ключа
      const variableKey = this._cleanString(templateMatch);

      // Для найденной переменной мы получаем значение, после чего в темплейте выполняем замену
      const variableValue = getValue(variableKey);

      // Для функции
      if (typeof variableValue === 'function') {
        // Записываем функцию в объект window
        // eslint-disable-next-line no-undef
        window[variableKey] = variableValue;
        // Заменяем все вхождения в темплейте
        template = template.replaceAll(templateMatch, `${variableKey}()`);
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
