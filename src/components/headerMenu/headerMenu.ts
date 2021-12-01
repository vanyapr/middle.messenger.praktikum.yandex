import Block from '../../utils/Block/Block';
import template from './headerMenu.tpl';
import '../../styles/components/header-menu/header-menu.scss';
import '../../styles/components/menu/menu.scss';
import compile from '../../utils/Compile/compile';

export default class HeaderMenu extends Block {
  constructor(props: any) {
    super(props, 'div', 'header-menu');
  }

  render() {
    return compile(template, { ...this.props });
  }

  toggle() {
    const headerMenuHidden = document.querySelector('.header-menu');

    if (headerMenuHidden) {
      headerMenuHidden.classList.toggle('header-menu_state_hidden');
    }
  }
}
