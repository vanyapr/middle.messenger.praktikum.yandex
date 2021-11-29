import '../../styles/components/menuButton/menuButton.scss';
import menuButton from './menuButton.tpl';
import Block from '../../utils/Block/Block';
import Template from '../../utils/Templater/Template';
import Render from '../../utils/Templater';

export default class MenuButton extends Block {
  render(): Template {
    return Render(menuButton, this.props, this.container);
  }
}
