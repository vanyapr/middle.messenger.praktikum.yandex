import validateInput from '../validateInput/validateInput';

// Валидирует форму
class FormValidator {
  private _form: HTMLFormElement

  private readonly _validClass: string

  private readonly _invalidClass: string

  private _buttonSelector: string

  constructor(
    form: HTMLFormElement,
    validClass: string,
    invalidClass: string,
    buttonSelector: string,
  ) {
    this._form = form;
    this._validClass = validClass;
    this._invalidClass = invalidClass;
    this._buttonSelector = buttonSelector;
  }

  private _collectFormElements() {
    return Array.from(this._form.elements)
      .filter((element:HTMLFormElement) => element.type !== 'submit' && element.type !== 'file');
  }

  // Валидирует форму и возвращает true если форма валидна
  run():boolean {
    const formElements = this._collectFormElements();

    // Запустим валидаторы на каждом элементе формы
    formElements.forEach((element: HTMLFormElement) => {
      validateInput(element, this._validClass, this._invalidClass, this._buttonSelector);
    });

    // Вычислим, валидна ли форма
    // eslint-disable-next-line max-len
    return formElements.every((element: HTMLFormElement) => validateInput(element, this._validClass, this._invalidClass));
  }
}

export default FormValidator;
