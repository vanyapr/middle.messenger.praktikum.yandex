import '../../styles/components/settings/settings.scss';
import Block from '../../utils/Block/Block';
import Render from '../../utils/Render';

import editPassword from './editPassword.tpl';

export default class EditPassword extends Block {
  render() {
    return Render(editPassword, this.props, this.container);
  }
}
