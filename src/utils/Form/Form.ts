import FormValidator from '../FormValidator/FormValidator';

interface IForm {
  // Возвратим либо объект, либо null если форма невалидна
  collectData(): object | null;
}

type TFormValues = {
  [key: string]: string
}

class Form implements IForm {
  private _form: HTMLFormElement

  private readonly _inputValidClass: string

  private readonly _inputInvalidClass: string

  private readonly _buttonSelector: string

  constructor(
    form: HTMLFormElement,
    inputValidClass: string,
    inputInvalidClass: string,
    buttonSelector: string,
  ) {
    this._form = form;
    this._inputValidClass = inputValidClass;
    this._inputInvalidClass = inputInvalidClass;
    this._buttonSelector = buttonSelector;
  }

  // Выполнит валидацию формы и вернет результат
  private _validate(): boolean {
    const validator = new FormValidator(
      this._form,
      this._inputValidClass,
      this._inputInvalidClass,
      this._buttonSelector,
    );

    return validator.run();
  }

  // Возвратит объект с данными формы если форма валидна,
  // либо отобразит ошибки валидации
  collectData(): object | null {
    const formIsValid = this._validate();

    if (formIsValid) {
      const formValues: TFormValues = {};
      // Собрать все элементы формы
      const formElements = Array.from(this._form.elements)
        .filter((element:HTMLFormElement) => element.type !== 'submit' && element.type !== 'file');

      // Для каждого элемента получить значение
      formElements.forEach((element: HTMLFormElement) => {
        // Значение элемента по ключу положить в объект
        formValues[element.name] = element.value;
      });

      // Если форма валидна, вернет значения полей, иначе вернет false
      return formValues;
    }
    return null;
  }
}

export default Form;
