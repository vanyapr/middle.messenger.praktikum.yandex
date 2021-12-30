import Block from '../../utils/Block/Block';
import '../../styles/components/message/message.scss';
import template from './chatMessage.tpl';
import compile from '../../utils/Compile/compile';
import { TProps } from '../../types/types';

export default class ChatMessage extends Block {
  constructor(props: TProps) {
    super(props, 'div', 'message');
  }

  // Сообщения не будут обновляться в этой версии приложения

  render() {
    return compile(template, { ...this.props });
  }
}
