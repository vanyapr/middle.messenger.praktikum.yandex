import Block from '../../utils/Block/Block';
import compile from '../../utils/Compile/compile';
import template from './link.tpl';

export default class Link extends Block {
  constructor(props: any) {
    super(props, 'a', 'form__link');
  }

  render() {
    return compile(template, { ...this.props });
  }
}
