import '../../styles/components/settings/settings.scss';
import Block from '../../utils/Block/Block';
import Render from '../../utils/Render';

import settings from './settings.tpl';

export default class Settings extends Block {
  render() {
    return Render(settings, this.props, this.container);
  }
}
