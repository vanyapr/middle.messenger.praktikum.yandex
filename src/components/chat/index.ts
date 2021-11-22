import Block from '../../utils/Block/Block';
import Render from '../../utils/Render';
import chat from './chat.tpl';
import '../../styles/components/chat/chat.scss';
import State from '../../utils/State/State';

// Стейт приложения
const state = new State();

class Chat extends Block {
  private _chatID: number

  componentDidMount() {
    this._chatID = this.props.id;

    // TODO: использовать идентификатор чата для подписки на стейт
    const updater = () => {
      this.setProps(state.get(`chat${this._chatID}`));
    };

    state.registerComponent(`chat${this._chatID}`, updater);
    console.log(this);
  }

  render() {
    return Render(chat, this.props, this.container);
  }
}

export default Chat;
