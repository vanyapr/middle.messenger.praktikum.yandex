// Принимает темплейт и данные, возвращает темплейт, заполненный данными
class Compiler {
  constructor(template, templateData) {
    this._template = template;
    this._templateData = templateData;
    // Регулярное выражение, которое будет искать вхождения строки с переменными в темплейте
    this._regExp = /\{\{*\s[a-zA-Z\.]*\s\}\}/gim;
  }

  // Очищает строку от брекетов и пробелов
  _cleanString = (stringWithBrackets) => stringWithBrackets.replace(/\{*\}*/g, '').trim()

  // Получение данных для темплейта по ключу объекта (key.subkey.morekeys)
  _getValue = (keyString) => {
    const cleanedString = this._cleanString(keyString);

    // Разделяем переменную темплейта на отдельные ключи по символу точки
    const keysArray = cleanedString.split('.');

    // Вопрос ревьюеру: А нужно ли это присвоение? Зачем плодить переменные?
    const templateData = this._templateData;

    // Выполняем поиск значения в ключе, вторым аргументом передаем объект
    const value = keysArray.reduce((dataObject, objectKey) => {
      // Если ключа нет, вернём undefined, потому что у undefined нельзя получить ключ (не объект)
      if (dataObject[objectKey] === undefined) {
        return undefined;
      }

      // Если в объекте есть такой ключ, запишем его в аккумулятор
      return dataObject[objectKey];
    }, templateData);

    // Для удобства чтения кода вернем значение отдельной строкой
    return value;
  }

  // Запишем значения в темплейт
  _fillTemplate = () => {
    // Переменная для записи текущего совпадения в темплейте
    let templateMatch = null;
    let template = this._template;
    const regularExpression = this._regExp;
    const getValue = this._getValue;

    // Проходим по темплейту
    // Вопрос к ревьюеру: как избежать в данном случае мутации переменной?
    // eslint-disable-next-line no-cond-assign
    while (templateMatch = regularExpression.exec(template)) {
      // Все вхождения регулярных выражений мы заменяем на переменные
      // Для найденной переменной мы получаем значение, после чего в темплейте выполняем замену
      const variableValue = getValue(templateMatch[0]);

      // Для функции
      if (typeof variableValue === 'function') {
        // Записываем функцию в объект window
        // eslint-disable-next-line no-undef
        window[variableValue] = variableValue;
        template.replace(templateMatch[0], `${variableValue}()`);
      }

      // Для обычной строки
      template = template.replace(templateMatch[0], variableValue);
    }

    // Если вхождений не будет, мы вернем изначальную строку
    return template;
  }

  // Компилирует темплейт с использованием встроенных методов
  compile() {
    // Заполняем темплейт данными и возвращаем его
    return this._fillTemplate();
  }
}

export default Compiler;
