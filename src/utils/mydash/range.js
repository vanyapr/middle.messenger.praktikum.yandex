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
