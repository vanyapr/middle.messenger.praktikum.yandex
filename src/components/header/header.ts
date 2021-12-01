import template from './header.tpl';
import Block from '../../utils/Block/Block';
import '../../styles/components/header/header.scss';
import compile from '../../utils/Compile/compile';

export default class Header extends Block {
  constructor(props: any) {
    super(props, 'header', 'header');
  }

  render() {
    return compile(template, { ...this.props });
  }
}
