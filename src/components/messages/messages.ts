import Block from '../../utils/Block/Block';
import Render from '../../utils/Render';

import '../../styles/components/messages/messages.scss';
import '../../styles/components/message/message.scss';
import '../../styles/components/reply/reply.scss';

// Темплейт
import messages from './messages.tpl';

export default class Messages extends Block {
  render() {
    return Render(messages, this.props, this.container);
  }
}
