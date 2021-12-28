import Block from '../../utils/Block/Block';
import compile from '../../utils/Compile/compile';
import template from './headerSettingsButton.tpl';
import State from '../../utils/State/State';
import { TProps } from '../../types/types';
const state = new State();

export default class HeaderSettingsButton extends Block {
  constructor(props: TProps) {
    super(props, 'button', 'header__settings');
  }

  componentDidMount() {
    const updater = () => {
      this.setProps(state.get('headerSettingsButton'));
    };

    state.registerComponent('headerSettingsButton', updater);

    // Скрыли по умолчанию
    this.hide();
  }

  render(): DocumentFragment {
    return compile(template, { ...this.props });
  }
}
