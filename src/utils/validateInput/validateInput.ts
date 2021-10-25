// Принимает форму, инпут для валидации, возвращает валидность инпута
function validateInput(input: HTMLFormElement, validClass: string, invalidClass: string): void {
  // Во всех инпутах укажем регулярные выражения для валидации
  // Получим значения валидатора
  // Будем собирать регулярки с элементов и проверять значения
  const validator = input.getAttribute('pattern');

  console.log(input);

  if (validator) {
    const regExp: RegExp = new RegExp(validator);
    // Вернём результат проверки регулярного выражения
    const result = regExp.test(input.value);
    // Если инпут валиден, вернем true
    // Если невалиден - false

    console.log(result);
    console.log(validator);

    if (result) {
      // Если значения валидны, будем добавлять класс (valid)
      input.classList.add(validClass);
      input.classList.remove(invalidClass);
    } else if (input.value.length > 0) {
      // Если значения невалидны, будем элементу добавлять класс (invalid)
      input.classList.add(invalidClass);
      input.classList.remove(validClass);
      // TODO: При невалидном инпуте будем отключать кнопку
    } else {
      // Если инпут пуст, ошибки не показываем
      input.classList.remove(validClass);
      input.classList.remove(invalidClass);
    }
  }
  // Если валидатора нет, инпут считаем валидным
}

export default validateInput;
