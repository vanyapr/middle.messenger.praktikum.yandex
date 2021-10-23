import Block from '../../utils/Block/Block';
import Render from '../../utils/Render';

// Темплейт
import container from './container.tpl';

export default class Container extends Block {
  render() {
    return Render(container, this.props, this.container);
  }
}
