import chats from './chats.tpl';
import Block from '../../utils/Block/Block';
import Render from '../../utils/Render';

import '../../styles/components/chats/chats.scss';
import '../../styles/components/chat/chat.scss';

export default class Chats extends Block {
  render() {
    return Render(chats, this.props, this.container);
  }
}
