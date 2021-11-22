import '../../styles/components/settings/settings.scss';
import '../../styles/components/button/button.scss';

import Block from '../../utils/Block/Block';
import Render from '../../utils/Render';
import editPassword from './editPassword.tpl';
import State from '../../utils/State/State';

const state = new State();

export default class EditPassword extends Block {
  componentDidMount() {
    const updater = () => {
      this.setProps(state.get('settings'));
    };

    state.registerComponent('settings', updater);
  }

  render() {
    return Render(editPassword, this.props, this.container);
  }
}
