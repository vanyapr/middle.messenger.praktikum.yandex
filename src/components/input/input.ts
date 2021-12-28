import '../../styles/components/inputs/inputs.scss';
import template from './input.tpl';
import Block from '../../utils/Block/Block';
import compile from '../../utils/Compile/compile';
import { TProps } from '../../types/types';

export default class Input extends Block {
  constructor(props: TProps) {
    super(props, 'div', 'form__group');
  }

  render() {
    return compile(template, { ...this.props });
  }
}
