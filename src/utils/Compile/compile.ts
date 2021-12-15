import Block from '../Block/Block';
import Templater from '../../utils/Templater';

// Возвращает фрагмент документа с вложенными блоками
function compile(templateString: string, props: any): DocumentFragment {
  const fragment = document.createElement('template');
  const components: Record<string, Block> = {};

  Object.entries(props).forEach(([name, value]) => {
    // Если пропсы являются одиночным элементом
    if (value instanceof Block) {
      components[value.id] = value;
      props[name] = `<div id="id-${value.id}">Заглушка</div>`;
    }

    // TODO: Если тут массив, то каждый элемент по ключу + индексу
    //  записываем в строку темплейта, а потом так же заменяем
    if (value instanceof Array) {
      props[name] = '';
      value.forEach((arrayItem, index) => {
        components[`${name}-${index}`] = arrayItem;
        props[name] += `<div id="id-${name}-${index}">Заглушка итема</div>`;
      });
    }
  });

  // Передали в фрагмент значения пропсов
  fragment.innerHTML = Templater(templateString, props).getString();

  Object.entries(components).forEach(([id, component]) => {
    const stub = fragment.content.querySelector(`#id-${id}`);

    // Если заглушка не найдена
    if (!stub) {
      console.log(`Заглушка не найдена ${id}`);
      return;
    }

    // Заменяем содержимое на контент элемента
    stub.replaceWith(component.getContent());
  });

  return fragment.content;
}

export default compile;
