import Block from '../../utils/Block/Block';
import template from './addChatForm.tpl';
import compile from '../../utils/Compile/compile';
import State from '../../utils/State/State';
import { TProps } from '../../types/types';

// Стейт приложения
const state = new State();

export default class AddChatForm extends Block {
  constructor(props: TProps) {
    // form form_type_popup
    super(props, 'form', 'form');
  }

  componentDidMount() {
    const updater = () => {
      this.setProps(state.get('addChatForm'));
    };

    state.registerComponent('addChatForm', updater);
  }

  render() {
    return compile(template, { ...this.props });
  }
}
