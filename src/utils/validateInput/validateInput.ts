// Принимает инпут для валидации, возвращает валидность инпута, проставляет классы

function validateInput(
  input: HTMLFormElement,
  validClass: string,
  invalidClass: string,
  buttonSelector?: string,
): boolean {
  // Во всех инпутах укажем регулярные выражения для валидации
  // Будем собирать регулярки с элементов и тестировать значения
  const validator = input.getAttribute('pattern');

  // TODO: Управление кнопками реализовать, сейчас с багами
  console.log(buttonSelector);
  // let button: null | HTMLButtonElement = null;
  // if (buttonSelector) {
  //   button = document.querySelector(buttonSelector);
  // }

  if (validator) {
    const regExp: RegExp = new RegExp(validator);
    // Вернём результат проверки регулярного выражения
    const result = regExp.test(input.value);

    // Если инпут валиден, вернем true
    if (result) {
      // Если значения валидны, будем добавлять класс (valid)
      input.classList.add(validClass);
      input.classList.remove(invalidClass);

      // if (button) {
      //   button.disabled = false;
      //   button.classList.add('button_state_success');
      //   button.classList.remove('button_state_disabled');
      // }
      return true;
    }
    // Если невалиден - false
    input.classList.add(invalidClass);
    input.classList.remove(validClass);

    // if (button) {
    //   button.disabled = true;
    //   button.classList.remove('button_state_success');
    //   button.classList.add('button_state_disabled');
    // }

    return false;
  }
  // Если валидатора нет, инпут считаем валидным
  return true;
}

export default validateInput;
