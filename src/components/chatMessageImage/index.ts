import Block from '../../utils/Block/Block';
import '../../styles/components/message/message.scss';
import template from './chatMessageImage.tpl';
import compile from '../../utils/Compile/compile';
import { TProps } from '../../types/types';

export default class ChatMessageImage extends Block {
  constructor(props: TProps) {
    super(props, 'div', 'message');
  }

  render() {
    return compile(template, { ...this.props });
  }
}
