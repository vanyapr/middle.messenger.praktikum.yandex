// Принимает элемент формы для валидации, возвращает валидность инпута, проставляет классы
function validateInput(
  input: HTMLFormElement,
  validator: string,
  validClass: string,
  invalidClass: string,
): boolean {
  // TODO: Отключать кнопку при невалидных инпутах в форме
  if (validator) {
    const regExp: RegExp = new RegExp(validator);
    // Вернём результат проверки регулярного выражения
    const result = regExp.test(input.value);

    // Если инпут валиден, вернем true
    if (result) {
      // Если значения валидны, будем добавлять класс (valid)
      input.classList.add(validClass);
      input.classList.remove(invalidClass);

      return true;
    }
    // Если невалиден - false
    input.classList.add(invalidClass);
    input.classList.remove(validClass);

    return false;
  }
  // Если валидатора нет, инпут считаем валидным
  return true;
}

export default validateInput;
