import Block from '../Block/Block';
import Templater from '../../utils/Templater';

// Возвращает фрагмент документа с вложенными блоками
function compile(templateString: string, props: any): DocumentFragment {
  const fragment = document.createElement('template');
  const components: Record<string, Block> = {};

  Object.entries(props).forEach(([name, value]) => {
    if (value instanceof Block) {
      components[value.id] = value;
      props[name] = `<div id="id-${value.id}">Заглушка</div>`;
    }
  });

  // Передали в фрагмент значения пропсов, в нашем случае надо это переделать
  fragment.innerHTML = Templater(templateString, props).getString();

  Object.entries(components).forEach(([id, component]) => {
    const stub = fragment.content.querySelector(`#id-${id}`);

    // Если заглушка не найдена
    if (!stub) {
      return;
    }

    // Заменяем содержимое на контент элемента
    stub.replaceWith(component.getContent());
  });

  return fragment.content;
}

export default compile;
