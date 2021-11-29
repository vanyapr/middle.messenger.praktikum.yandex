import Block from '../../utils/Block/Block';
import Render from '../../utils/Templater';

import '../../styles/components/error/error.scss';

// Темплейт
import error from './error.tpl';

export default class Error extends Block {
  render() {
    return Render(error, this.props, this.container);
  }
}
