import '../../styles/components/back-button/back-button.scss';
import Block from '../../utils/Block/Block';
import template from './backButton.tpl';
import compile from '../../utils/Compile/compile';

export default class BackButton extends Block {
  constructor(props: any) {
    super(props, 'aside', 'back-button');
  }

  render() {
    return compile(template, { ...this.props });
  }
}
