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

  private _button: HTMLFormElement | null

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

    this._button = document.querySelector(this._buttonSelector);
  }

  // Отключает кнопку в форме
  disableButton():void {
    if (this._button) {
      this._button.classList.add('button_state_disabled');
      this._button.disabled = true;
    }
  }

  // Включает кнопку в форме
  enableButton():void {
    if (this._button) {
      this._button.classList.remove('button_state_disabled');
      this._button.disabled = false;
    }
  }

  // либо отобразит ошибки валидации
  collectData(): Record<string, any> | null {
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

  // Возвратит объект с данными формы если форма валидна,

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
}

export default Form;
