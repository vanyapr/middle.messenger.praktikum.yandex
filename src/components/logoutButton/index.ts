import Block from '../../utils/Block/Block';
import compile from '../../utils/Compile/compile';
import template from './logoutButton.tpl';

export default class LogoutButton extends Block {
  constructor(props: any) {
    super(props, 'div', 'settings__group');
  }

  render() {
    return compile(template, { ...this.props });
  }
}
