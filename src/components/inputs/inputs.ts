import Block from '../../utils/Block/Block';
import Render from '../../utils/Render';

import '../../styles/components/inputs/inputs.scss';
// Темплейт
import inputs from './inputs.tpl';

export default class Inputs extends Block {
  render() {
    return Render(inputs, this.props, this.container);
  }
}
