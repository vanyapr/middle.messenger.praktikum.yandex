// isEmpty
// Создайте функцию, которая проверяет, является ли переданный аргумент пустым.
// Аргументами могут быть:
//      Object,
//      Array,
//      Map,
//      Set,
//      примитивы.
// Значения 0 и другие Number, null, true, false, "", undefined, [], {} должны возвращать true.

function isEmpty(value) {
    let result = false;
    // console.log(value);

    // Если строка без текста
    if (typeof value === 'string') {
        result =  value.length === 0;
    }

    // Если это число, то всегда true
    if (typeof value === 'number') {
        result = true;
    }

    // При булевых значениях всегда true
    if (typeof value === 'boolean') {
        result = true;
    }

    // Объект может быть null или пустым
    if (typeof value === 'object') {
        if (value === null) {
            // Это null
            result = true;
        } else if (Object.keys(value).length === 0) {
            // У объекта/массива нет ключей, значит он пуст
            // У set нет object.keys, значит он пуст
            if (value.size === 'undefined' || value.size === 0) {
                result = true;
            }
        }
    }

    // Undefined
    if (typeof value === 'undefined') {
        result = true;
    }


    // console.log(`Value ${JSON.stringify(value)}, result is ${result}`);
    // console.log(`Value from obj is ${JSON.stringify(value)}`);

    return result;
}
