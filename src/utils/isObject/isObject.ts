type TPlainObject = {
  [key: string]: any
}

// Это точно объект
function isObject(value: unknown): value is TPlainObject {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';
}

export default isObject;
