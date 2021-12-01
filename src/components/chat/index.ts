import '../../styles/components/chat/chat.scss';
import template from './chat.tpl';
import Block from '../../utils/Block/Block';
import State from '../../utils/State/State';
import compile from '../../utils/Compile/compile';

// Стейт приложения
const state = new State();

class Chat extends Block {
  private _chatID: number

  constructor(props: any) {
    super(props, 'div', 'chat');
  }

  componentDidMount() {
    this._chatID = this.props.id;

    const updater = () => {
      this.setProps(state.get(`chat${this._chatID}`));
    };

    state.registerComponent(`chat${this._chatID}`, updater);
  }

  render() {
    return compile(template, { ...this.props });
  }
}

export default Chat;
