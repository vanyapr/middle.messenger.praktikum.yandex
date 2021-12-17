import Block from '../../utils/Block/Block';
import template from './deleteUserForm.tpl';
import compile from '../../utils/Compile/compile';
import State from '../../utils/State/State';

// Стейт приложения
const state = new State();

export default class DeleteUserForm extends Block {
  constructor(props: any) {
    // form form_type_popup
    super(props, 'form', 'form');
  }

  componentDidMount() {
    const updater = () => {
      this.setProps(state.get('deleteUserForm'));
    };

    state.registerComponent('deleteUserForm', updater);
  }

  render() {
    return compile(template, { ...this.props });
  }
}
