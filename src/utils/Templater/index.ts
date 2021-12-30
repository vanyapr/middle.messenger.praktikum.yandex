import Compiler from './Compiler'; // Заполняет темплейт данными
import Template from './Template'; // Использую в качестве типа

// Возвращает строку темплейта
const render = (templateString: string, data: {}): Template => {
  // Заполняем темплейт данными
  const template = new Compiler(templateString, data).compile();
  // Так делаю для читаемости
  return template;
};

export default render;
