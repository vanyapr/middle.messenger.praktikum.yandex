import Block from '../../utils/Block/Block';
import '../../styles/components/error/error.scss';

import template from './error.tpl';
import Renderer from '../../utils/Render/Render';
import compile from '../../utils/Compile/compile';
import { TProps } from '../../types/types';

export default class Error extends Block {
  constructor(props: TProps) {
    super(props, 'div', 'error');
  }

  render() {
    return compile(template, this.props);
  }

  // Добавляем на страницу компоненты
  display() {
    const renderer = new Renderer('#root');
    renderer.render(this.getContent());
  }
}
