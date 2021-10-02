

// Функция должна принимать четыре аргумента:
//     start — число, с которого начнётся последовательность. Это необязательный аргумент — по умолчанию функция должна начинать с 0.
//     end — число, конец последовательности. Функция должна остановиться, не доходя до этого числа.
//     step — число, шаг между элементами в последовательности. Это необязательный аргумент: значение по умолчанию — 1.
//     isRight — булево значение. Если false, функция генерирует прямой порядок последовательности. Иначе — обратный. Это необязательный аргумент: значение по умолчанию — false.
//В результате функция должна вернуть массив чисел заданной последовательности.

function rangeRight(start, end, step) {
    return range(start, end, step, true);
}

function isIntegerOrUndefined (startPosition, endPosition, step) {
    return typeof (startPosition) === 'number' && (typeof (endPosition) === 'number' || typeof (endPosition) === 'undefined') && typeof (step) === 'number';
}

function range(startPosition, endPosition, step = 1, isRight = false) {
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

        if (stepSize === 0) {
            for (let counter = startPosition; counter < endPosition; counter++) {
                result.push(startPosition);
            }

            return result;
        }

        // Если порядок нормальный
        if (!isRight) {
            if (endPosition > 0) {
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
        } else {
            // Если порядок обратный - мы меняем знаки сравнения и направление счетчиков
           if (endPosition > 0) {
                // Если число шагов положительное
                for (let counter = endPosition - stepSize; counter * stepSize >= startPosition; counter -= stepSize) {
                    // console.log(`${counter} > ${startPosition}`);
                    // Учитываем шаг
                    result.push(counter);
                }
            } else if (endPosition < 0) {
                // Если число отрицательное
                for (let counter = endPosition + stepSize; counter * stepSize <= startPosition; counter += stepSize) {
                    // Вычитаем прямо из счётчика
                    result.push(counter);
                }
            }
        }

        return result;
    } else {
        console.log(startPosition, endPosition, step);
        return false;
    }
}

