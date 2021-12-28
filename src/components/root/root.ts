import template from './root.tpl';
import Block from '../../utils/Block/Block';
import '../../styles/components/form/form.scss';
import '../../styles/components/button/button.scss';
import '../../styles/components/label/label.scss';
import '../../styles/components/input/input.scss';
import compile from '../../utils/Compile/compile';
import Renderer from '../../utils/Render/Render';

export default class Test extends Block {
  render() {
    return compile(template, { ...this.props });
  }

  // Добавляем на страницу компоненты
  display() {
    const renderer = new Renderer('#root');
    renderer.render(this.getContent());
  }
}
