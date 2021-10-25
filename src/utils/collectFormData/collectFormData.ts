import validateInput from '../validateInput/validateInput';

// TODO: переделать в класс (в данной итерации важно соблюсти сроки)
// Собирает данные у формы, на которую повешена как листенер
// Итерируется по элементам формы
// Возвращает в консоль объект со значениями полей
function collectFormData(form: HTMLFormElement, validClass: string, invalidClass: string): void {
  const formValues: Record<string, string> = {};
  // Собрать все элементы формы
  const formElements = Array.from(form.elements)
    .filter((element:HTMLFormElement) => element.type !== 'submit' && element.type !== 'file'); // Нас не интересуют кнопки сабмита

  // Для каждого элемента получить значение
  formElements.forEach((element: HTMLFormElement) => {
    // Раз уж мы при инпуте собираем данные формы, можем валидацию сделать тут же
    validateInput(element, validClass, invalidClass);
    // Значение элемента по ключу положить в объект
    formValues[element.name] = element.value;
  });

  // Объект записать в консоль
  console.log(formValues);
}

export default collectFormData;
