import Block from '../../utils/Block/Block';
import '../../styles/components/messages/messages.scss';
import '../../styles/components/message/message.scss';
import '../../styles/components/reply/reply.scss';
import template from './messages.tpl';
import compile from '../../utils/Compile/compile';
import State from '../../utils/State/State';
import { TProps } from '../../types/types';
// Стейт приложения
const state = new State();

export default class Messages extends Block {
  constructor(props: TProps) {
    super(props, 'section', 'messages');
  }

  componentDidMount() {
    const updater = () => {
      this.setProps(state.get('messages'));
    };

    state.registerComponent('messages', updater);
  }

  // TODO: Написать метод скролла чата вниз, который будет скроллить чат вниз
  scrollToBottom() {

  }

  render() {
    // Будем пересобирать список чатов при апдейте компонента
    const messagesListConstructor: Function = this.props.messagesListConstructor as Function;
    const messagesList = messagesListConstructor(this.props.messagesList);
    return compile(template, { messages: messagesList });
  }
}
