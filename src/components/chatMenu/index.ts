import Block from '../../utils/Block/Block';
import render from '../../utils/Render';
import Template from '../../utils/Render/Template';
import chatMenu from './chatMenu.tpl';

export default class ChatMenu extends Block {
  render(): Template {
    return render(chatMenu, this.props, this.container);
  }
}
