import '../../styles/components/back-button/back-button.scss';
import Block from '../../utils/Block/Block';
import Render from '../../utils/Render';

// Темплейт
import backButton from './backButton.tpl';

export default class BackButton extends Block {
  render() {
    return Render(backButton, this.props, this.container);
  }
}
