// class CollectFormData {
//   // Селектор формы
//   // private _formSelector: string;
//
//   // Форма
//   private _form: HTMLElement | null;
//
//   // Листенер
//   private _submitAction: any;
//
//   constructor(formSelector: HTMLElement, submitAction: any) {
//     // this._formSelector = formSelector;
//     this._submitAction = submitAction;
//     this._init();
//   }
//
//   _init() {
//     // this._getForm();
//     this._setEventListeners();
//   }
//
//   // Получить форму
//   private _getForm(): void {
//     if (this._formSelector.length === 0) {
//       throw new Error('Селектор формы не может быть пустым');
//     } else {
//       this._form = document.querySelector(this._formSelector);
//     }
//   }
//
//   // Установить листенер сабмита
//   private _setEventListeners(): void {
//     if (this._form) {
//       this._form.addEventListener('submit', this._submitAction);
//     }
//   }
// }
