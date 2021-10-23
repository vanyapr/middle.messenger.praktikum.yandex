import loginForm from './signUpForm.tpl';
import Block from '../../utils/Block/Block';
import Render from '../../utils/Render';

import '../../styles/components/form/form.scss';
import '../../styles/components/button/button.scss';
import '../../styles/components/label/label.scss';
import '../../styles/components/input/input.scss';

export default class LoginForm extends Block {
  render() {
    return Render(loginForm, this.props, this.container);
  }
}
