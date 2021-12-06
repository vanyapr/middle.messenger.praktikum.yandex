import Block from '../../utils/Block/Block';
import compile from '../../utils/Compile/compile';
import template from './editPasswordForm.tpl';

export default class EditPasswordForm extends Block {
  constructor(props: any) {
    super(props, 'form', 'settings__form');
  }

  render() {
    return compile(template, { ...this.props });
  }
}
