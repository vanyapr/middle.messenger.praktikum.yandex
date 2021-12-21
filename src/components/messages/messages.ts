import Block from '../../utils/Block/Block';
import '../../styles/components/messages/messages.scss';
import '../../styles/components/message/message.scss';
import '../../styles/components/reply/reply.scss';
import template from './messages.tpl';
import compile from '../../utils/Compile/compile';
import State from '../../utils/State/State';
// Стейт приложения
const state = new State();

export default class Messages extends Block {
  constructor(props:any) {
    super(props, 'section', 'messages');
  }

  componentDidMount() {
    const updater = () => {
      this.setProps(state.get('messages'));
    };

    state.registerComponent('messages', updater);
  }

  render() {
    // Будем пересобирать список чатов при апдейте компонента
    const messagesList = this.props.messagesListConstructor(this.props.messagesList);
    return compile(template, { messages: messagesList });
  }
}
