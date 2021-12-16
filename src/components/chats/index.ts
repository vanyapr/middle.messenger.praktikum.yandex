import template from './chats.tpl';
import Block from '../../utils/Block/Block';

import '../../styles/components/chats/chats.scss';
import State from '../../utils/State/State';
import compile from '../../utils/Compile/compile';

// Стейт приложения
const state = new State();

export default class Chats extends Block {
  constructor(props: any) {
    super(props, 'section', 'chats');
  }

  componentDidMount() {
    const updater = () => {
      console.log('Записали пропсы компонента');
      const chats = state.get('chats');
      console.log(chats);
      this.setProps(chats);
    };

    state.registerComponent('chats', updater);
  }

  render() {
    // Будем пересобирать список чатов при апдейте
    const chatsList = this.props.getChatsList(this.props.list);
    return compile(template, { list: chatsList });
  }
}
