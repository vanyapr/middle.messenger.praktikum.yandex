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
      console.log('Выполнен апдейт компонента');
      this.setProps(state.get('chats'));
    };

    state.registerComponent('chats', updater);
  }

  render() {
    return compile(template, { ...this.props });
  }
}
