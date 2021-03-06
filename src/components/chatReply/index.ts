import Block from '../../utils/Block/Block';
import '../../styles/components/reply/reply.scss';
import template from './chatReply.tpl';
import compile from '../../utils/Compile/compile';
import { TProps } from '../../types/types';

export default class ChatReply extends Block {
  constructor(props: TProps) {
    super(props, 'div', 'reply');
  }

  // Сообщения не будут обновляться в этой версии приложения

  render() {
    return compile(template, { ...this.props });
  }
}
