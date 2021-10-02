function first (arrayVariable) {
    if (Array.isArray(arrayVariable)) {
        return arrayVariable[0];
    } else {
        return false;
    }
}

// export default first;

//
// console.log(first([1, 2, 3]));
// console.log(first([]));
