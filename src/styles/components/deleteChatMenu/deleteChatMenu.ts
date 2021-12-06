import template from './deleteChatMenu.tpl';
import Block from '../../../utils/Block/Block';
import compile from '../../../utils/Compile/compile';
import State from '../../../utils/State/State';
// Стейт приложения
const state = new State();

export default class DeleteChatMenu extends Block {
  constructor(props: any) {
    // TODO: передавать сюда ID чата для удаления
    super(props, 'div', 'chat-menu');
  }

  componentDidMount() {
    const updater = () => {
      this.setProps(state.get('deleteChatMenu'));
    };

    state.registerComponent('deleteChatMenu', updater);

    this.hide();
    state.set('deleteChatMenu', { visible: false });
  }

  render() {
    return compile(template, { ...this.props });
  }
}
