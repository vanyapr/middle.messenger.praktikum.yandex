import Block from '../../utils/Block/Block';
import compile from '../../utils/Compile/compile';
import template from './messageForm.tpl';

export default class MessageForm extends Block {
  constructor(props: any) {
    super(props, 'form', 'inputs');
  }

  render() {
    return compile(template, { ...this.props });
  }
}
