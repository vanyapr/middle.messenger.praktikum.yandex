import loginForm from './signUpForm.tpl';
import Block from '../../utils/Block/Block';
import Render from '../../utils/Templater';

import '../../styles/components/form/form.scss';
import '../../styles/components/button/button.scss';
import '../../styles/components/label/label.scss';
import '../../styles/components/input/input.scss';

import State from '../../utils/State/State';

const state = new State();

export default class LoginForm extends Block {
  componentDidMount() {
    const updater = () => {
      this.setProps(state.get('signUpForm'));
    };

    state.registerComponent('signUpForm', updater);
  }

  render() {
    return Render(loginForm, this.props, this.container);
  }
}
