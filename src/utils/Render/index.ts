import Compiler from './Compiler'; // Заполняет темплейт данными
import Template from './Template'; // Использую в качестве типа

type TSelector = string | null | undefined;

// Функция - рендерер
const render = (templateString: string, data: {}, containerSelector?: TSelector): Template => {
  // Заполняем темплейт данными
  const template = new Compiler(templateString, data, containerSelector).compile();
  // Так делаю для читаемости, и фиг знает, может пригодиться
  return template;
};

export default render;
