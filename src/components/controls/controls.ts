import Block from '../../utils/Block/Block';
import Render from '../../utils/Templater';

import '../../styles/components/controls/controls.scss';
import '../../styles/components/button/button.scss';

// Темплейт
import controls from './controls.tpl';

export default class Controls extends Block {
  render() {
    return Render(controls, this.props, this.container);
  }
}
