import Block from '../../utils/Block/Block';
import '../../styles/components/reply/reply.scss';
import template from './chatMessageImage.tpl';
import compile from '../../utils/Compile/compile';

export default class ChatMessageImage extends Block {
  constructor(props:any) {
    super(props, 'div', 'message');
  }

  render() {
    return compile(template, { ...this.props });
  }
}
