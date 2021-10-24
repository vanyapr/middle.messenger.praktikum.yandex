import Compiler from './Compiler'; // Заполняет темплейт данными
import Render from './Render'; // Добавляет на страницу

type TSelector = string | null | undefined;

// Функция - рендерер
const render = (template: string, data: {}, containerSelector: TSelector): void | string => {
  // Заполняем темплейт данными
  const compiler = new Compiler(template, data);

  // Тут мы получаем теперь объект из двух частей: {темплейт, листенеры}
  const { compiledTemplate, listeners } = compiler.compile();

  console.log(listeners);

  // Если не передан аргумент с контейнером, то элемент будет просто возвращён
  if (containerSelector) {
    // Контейнер для рендера
    const renderer = new Render(containerSelector);
    // Возвратим рендер
    return renderer.render(compiledTemplate);
  }

  // FIXME: Если у нас компилируется вложенный темплейт, мы не можем передать в него листенеры
  return compiledTemplate;
};

export default render;
