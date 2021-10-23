import '../../styles/components/settings/settings.scss';
import Block from '../../utils/Block/Block';
import Render from '../../utils/Render';

import editSettings from './editSettings.tpl';

export default class EditSettings extends Block {
  render() {
    return Render(editSettings, this.props, this.container);
  }
}
