import Compiler from './Compiler'; // Заполняет темплейт данными
import Render from './Render';
import Template from './Template'; // Добавляет на страницу

type TSelector = string | null | undefined;

// Функция - рендерер
const render = (templateString: string, data: {}, containerSelector: TSelector): Template => {
  // Заполняем темплейт данными
  const template = new Compiler(templateString, data).compile();

  const listeners = template.getListeners();
  const compiledTemplate = template.get();

  // TODO: Вынести в отдельный файл
  // Если не передан аргумент с контейнером, то элемент будет просто возвращён
  if (containerSelector) {
    // Вызываем рендер
    new Render(containerSelector).render(compiledTemplate);

    // Добавим листенеры
    const keys = Object.keys(listeners);

    keys.forEach((key) => {
      // Вычислим селектор элемента на основании объекта
      const query = `[data-${listeners[key].type}="${key}"]`;

      // Получим элемент
      const elements = document.querySelectorAll(query);

      if (elements.length) {
        elements.forEach((element) => {
          // Если элемент найден, повесим на него листенеры
          element.addEventListener(listeners[key].type, listeners[key].method);
          // Удалим аттрибут потому что можем (эта работа с дом нереально медленная)
          element.removeAttribute(`data-${listeners[key].type}`);
        });
      }
    });
  }

  // FIXME: Если у нас компилируется вложенный темплейт,
  //  мы не можем передать в него листенеры?
  return template;
};

export default render;
