import Compiler from './Compiler'; // Заполняет темплейт данными
import Render from './Render'; // Добавляет на страницу

type TSelector = string | null | undefined;

// Функция - рендерер
const render = (template: string, data: {}, containerSelector: TSelector): void | string => {
  // Заполняем темплейт данными
  const compiler = new Compiler(template, data);

  // Тут мы получаем теперь объект из двух частей: {темплейт, листенеры}
  const { compiledTemplate, listeners } = compiler.compile();

  // Если не передан аргумент с контейнером, то элемент будет просто возвращён
  if (containerSelector) {
    // Контейнер для рендера
    const renderer = new Render(containerSelector);

    renderer.render(compiledTemplate);

    // Добавим листенеры
    const keys = Object.keys(listeners);

    keys.forEach((key) => {
      // Вычислим селектор элемента на основании объекта
      const query = `[data-${listeners[key].type}="${key}"]`;

      // Получим элемент
      const elements = document.querySelectorAll(query);

      if (elements.length > 0) {
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
  return compiledTemplate;
};

export default render;
