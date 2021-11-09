import Block from '../../utils/Block/Block';
import Template from '../../utils/Render/Template';
import addUserForm from './addUserForm.tpl';
import render from '../../utils/Render';

export default class AddUserForm extends Block {
  render(): Template {
    return render(addUserForm, this.props, this.container);
  }
}
