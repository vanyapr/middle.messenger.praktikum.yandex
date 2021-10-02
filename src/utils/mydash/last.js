// Выдаёт последний элемент массива или false
function last (arrayVariable) {
    if (Array.isArray(arrayVariable))  {
        return arrayVariable[arrayVariable.length - 1];
    } else {
        return false;
    }
}

export default last;
