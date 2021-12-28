import Block from '../../utils/Block/Block';
import compile from '../../utils/Compile/compile';
import template from './messageForm.tpl';
import { TProps } from '../../types/types';

export default class MessageForm extends Block {
  constructor(props: TProps) {
    super(props, 'form', 'inputs');
  }

  render() {
    return compile(template, { ...this.props });
  }
}
