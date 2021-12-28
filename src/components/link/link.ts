import Block from '../../utils/Block/Block';
import compile from '../../utils/Compile/compile';
import template from './link.tpl';
import { TProps } from '../../types/types';

export default class Link extends Block {
  constructor(props: TProps) {
    super(props, 'a', 'form__link');
  }

  render() {
    return compile(template, { ...this.props });
  }
}
