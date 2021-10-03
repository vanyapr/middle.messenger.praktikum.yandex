// Движок рендера
import Render from './Render';
import Compiler from './Compiler';

// Функция - рендерер
const ez = (template, data, containerSelector) => {
  //
  const compiler = new Compiler(template, data);
  const compiledTemplate = compiler.compile();
  // Контейнер для рендера
  const renderContainer = document.querySelector(containerSelector);

  // Создали экземпляр рендерера
  const renderer = new Render(renderContainer);

  // Отобразили данные на станице
  renderer.render(compiledTemplate);
};

export default ez;
