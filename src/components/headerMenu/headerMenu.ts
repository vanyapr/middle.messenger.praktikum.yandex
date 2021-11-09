import Block from '../../utils/Block/Block';
import Render from '../../utils/Render';
import Template from '../../utils/Render/Template';
import headerMenu from './headerMenu.tpl';
import '../../styles/components/header-menu/header-menu.scss';
import '../../styles/components/menu/menu.scss';

export default class HeaderMenu extends Block {
  render(): Template {
    return Render(headerMenu, this.props, this.container);
  }

  toggle() {
    const headerMenuHidden = document.querySelector('.header-menu');

    if (headerMenuHidden) {
      headerMenuHidden.classList.toggle('header-menu_state_hidden');
    }
  }
}
