import Block from '../../utils/Block/Block';
import template from './container.tpl';
import compile from '../../utils/Compile/compile';
import Renderer from '../../utils/Render/Render';

export default class Container extends Block {
  constructor(props: any) {
    super(props, 'section', 'settings');
  }

  render() {
    return compile(template, { ...this.props });
  }

  // Добавляем на страницу компоненты
  display() {
    console.log('Показываем');
    const renderer = new Renderer('#root');
    renderer.render(this.getContent());
  }
}
