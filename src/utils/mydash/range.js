function isIntegerOrUndefined (startPosition, endPosition, step) {
    return typeof (startPosition) === 'number' && (typeof (endPosition) === 'number' || typeof (endPosition) === 'undefined') && typeof (step) === 'number';
}

// Создаёт массив чисел (положительных или отрицательных), растущих от начальной заданной границы до конечной, не включая её.
// Шаг -1 используется, если задано отрицательное начало без конца или шага.
// Если не задано значение окончания последовательности, то скрипт считает первое значение концом последовательности и начинает с нуля с шагом один.
function range(startPosition, endPosition, step = 1) {
    // Проверяем, все ли значения у нас являются числами
    if (isIntegerOrUndefined(startPosition, endPosition, step)) {
        // Пустой массив для возврата
        let result = [];
        // Размер шага посчитаем как модуль числа (для нас нет разницы в знаке перед размером шага)
        const stepSize = Math.abs(step)

        // Если у функции только один аргумент
        if (!endPosition) {
            // Конечная позиция равна первому аргументу
            endPosition = startPosition;
            // Стартовая позиция равна нулю
            startPosition = 0;
        }

        // Если размер шага равен нулю (число не растёт)
        if (stepSize === 0) {
            for (let counter = startPosition; counter < endPosition; counter++) {
                result.push(startPosition);
            }
        } else if (endPosition > 0) {
            // Если число шагов положительное
            for (let counter = startPosition; counter * stepSize < endPosition; counter++) {
                // Учитываем шаг
                result.push(counter * stepSize);
            }
        } else if (endPosition < 0) {
            // Если число отрицательное
            for (let counter = startPosition; counter * stepSize > endPosition; counter--) {
                // Учитываем шаг
                result.push(counter * stepSize);
            }
        }

        return result;
    } else {
        console.log(startPosition, endPosition, step);
        return false;
    }
}

console.log(range(4))
// => [0, 1, 2, 3]

console.log(range(-4));
// // => [0, -1, -2, -3]

console.log(range(1, 5));
// // => [1, 2, 3, 4]
//
console.log(range(0, 20, 5));
// // => [0, 5, 10, 15]
//
console.log(range(0, -4, -1));
// // => [0, -1, -2, -3]
//
console.log(range(1, 4, 0));
// // => [1, 1, 1]
//
console.log(range(0));
// => []


// Авторское решение
const baseRange = (start, end, step) => {
    let index = -1; // Индекс стал минус 1
    let length = Math.max(Math.ceil((end - start) / (step || 1)), 0); // Получили длину массива (ЗАЧЕМ ТАК УСИРАТЬСЯ???)
    const result = new Array(length); // Создали новый массив

    while (length--) {
        result[++index] = start; // записали в индекс (0) значение стартовой переменной
        start += step; // прибавили к стартовой переменной значение шага
    }

    return result; // вернули результирующий массив
}
//
// // Проверку на типы данных не добавлял, но студенты должны будут
function getRange(start = 0, end, step) {

    // Пофиксили проблему с порядком переменных
    if (end === undefined) {
        end = start;
        start = 0;
    }

    // Переключили шаг массива
    step = step === undefined ? (start < end ? 1 : -1) : step;
    // Вызвали расчёт массива
    return baseRange(start, end, step);
}
