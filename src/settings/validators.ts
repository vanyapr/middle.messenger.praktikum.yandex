export const emailValidator:string = '^[a-zA-Z0-9\\-]+@[a-zA-Z0-9\\-]+\\.[a-zA-Z0-9\\-]+$'; // Буквы цифры @
export const loginValidator:string = '^(?!^\\d+$)[a-zA-Z\\d\\-_]{4,20}$'; // Буквы цифры подчеркивания дефисы
export const passwordValidator:string = '^(?=.*?[A-ZА-ЯЁ])(?=.*?[0-9]).{8,40}$'; // Буквы цифры спецсимволы
export const nameValidator:string = '^[A-ZА-ЯЁ]+[a-zа-яё\-]+$'; // Буквы дефисы
export const phoneValidator:string = '^\\+?[0-9]{10,15}'; // Цифры и может начинаться с плюса
export const notEmptyValidator:string = '[^\\s]+'; // Всё кроме пробелов
