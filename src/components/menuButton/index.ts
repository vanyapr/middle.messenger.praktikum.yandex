import '../../styles/components/menuButton/menuButton.scss';
import template from './menuButton.tpl';
import Block from '../../utils/Block/Block';
import compile from '../../utils/Compile/compile';
import { TProps } from '../../types/types';

export default class MenuButton extends Block {
  constructor(props: TProps) {
    super(props, 'button', 'menu-button');
  }

  render() {
    return compile(template, { ...this.props });
  }
}
