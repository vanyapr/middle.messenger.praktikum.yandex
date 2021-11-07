// Тип объекта
type PlainObject<T = unknown> = {
  [k in string]: T;
};

// Проверяет, что у нас объект
function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';
}

// Сравнивает объекты и возвращает true если они идентичны
function isEqual(a: PlainObject, b: PlainObject): boolean {
  // Код здесь
  // Исходим из того, что ключей null у объекта не будет
  if (!(isPlainObject(a) && isPlainObject(b)) || (a === null || b === null)) {
    throw new Error('Аргументами должны быть объекты');
  }

  // Получаем ключи объекта
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  // Считаем длину объекта
  if (aKeys.length === bKeys.length) {
    // Если длина совпадает, сравниваем ключи по значениям
    return aKeys.every((key: string) => {
      // Если значение - объект, вызываем сравнение рекурсивно
      if (typeof a[key] === 'object') {
        return isEqual(a[key] as PlainObject, b[key] as PlainObject);
      }
      // Каждый ключ сравниваем по значению
      return a[key] === b[key];
    });
  }
  return false;
}

export default isEqual;
