// Движок рендера
import Render from './Render';
import Compiler from './Compiler';

// Функция - рендерер
const buildTemplate = (template, data, containerSelector) => {
  // Решил сделать в виде функции, потому что надо вызывать новые экземпляры классов
  const compiler = new Compiler(template, data);
  const compiledTemplate = compiler.compile();
  // Контейнер для рендера
  const renderContainer = document.querySelector(containerSelector);

  // Если контейнер не найден, мы выведем в консоль ошибку
  if (renderContainer) {
    // Создали экземпляр рендерера
    const renderer = new Render(renderContainer);

    // Отобразили данные на станице
    renderer.render(compiledTemplate);
  } else {
    console.log('Контейнер для рендера не найден');
  }
};

export default buildTemplate;
