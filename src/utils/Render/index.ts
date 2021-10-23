import Compiler from './Compiler'; // Заполняет темплейт данными
import Render from './Render'; // Добавляет на страницу

type TSelector = string | null | undefined;

// Функция - рендерер
const render = (template: string, data: {}, containerSelector: TSelector): void | string => {
  // Заполняем темплейт данными
  const compiler = new Compiler(template, data);
  const compiledTemplate = compiler.compile();

  // Если не передан аргумент с контейнером, то элемент будет просто возвращён
  if (containerSelector) {
    // Контейнер для рендера
    const renderer = new Render(containerSelector);
    // Возвратим рендер
    return renderer.render(compiledTemplate);
  }

  return compiledTemplate;
};

export default render;
