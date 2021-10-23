import header from './header.tpl';
import Block from '../../utils/Block/Block';
import Render from '../../utils/Render';

import '../../styles/components/header/header.scss';

export default class Header extends Block {
  render() {
    return Render(header, this.props, this.container);
  }
}
