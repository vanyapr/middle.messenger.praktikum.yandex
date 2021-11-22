import chats from './chats.tpl';
import Block from '../../utils/Block/Block';
import Render from '../../utils/Render';

import '../../styles/components/chats/chats.scss';
import State from '../../utils/State/State';

// Стейт приложения
const state = new State();

export default class Chats extends Block {
  componentDidMount() {
    const updater = () => {
      this.setProps(state.get('chats'));
    };

    state.registerComponent('chats', updater);
  }

  render() {
    // TODO:
    //  собрать данные в чаты, чаты отрендерить

    return Render(chats, this.props, this.container);
  }
}
