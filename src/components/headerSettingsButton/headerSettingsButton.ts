import Block from '../../utils/Block/Block';
import compile from '../../utils/Compile/compile';
import template from './headerSettingsButton.tpl';
import State from '../../utils/State/State';
const state = new State();

export default class HeaderSettingsButton extends Block {
  constructor(props: any) {
    super(props, 'button', 'header__settings');
  }

  componentDidMount() {
    const updater = () => {
      this.setProps(state.get('headerSettingsButton'));
    };

    state.registerComponent('headerSettingsButton', updater);

    // Установили состояние в "не нажата"
    state.set('headerSettingsButton', { pressed: false });
  }

  render(): DocumentFragment {
    return compile(template, { ...this.props });
  }
}
