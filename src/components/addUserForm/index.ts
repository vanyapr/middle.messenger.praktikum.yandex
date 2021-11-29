import Block from '../../utils/Block/Block';
import Template from '../../utils/Templater/Template';
import addUserForm from './addUserForm.tpl';
import render from '../../utils/Templater';

export default class AddUserForm extends Block {
  render(): Template {
    return render(addUserForm, this.props, this.container);
  }
}
