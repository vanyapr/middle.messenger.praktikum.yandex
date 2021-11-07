import Compiler from './Compiler'; // Заполняет темплейт данными
import Template from './Template'; // Добавляет на страницу

type TSelector = string | null | undefined;

// Функция - рендерер
const render = (templateString: string, data: {}, containerSelector?: TSelector): Template => {
  // Заполняем темплейт данными
  const template = new Compiler(templateString, data, containerSelector).compile();

  return template;
};

export default render;
