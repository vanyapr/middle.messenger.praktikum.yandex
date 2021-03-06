import Block from '../../utils/Block/Block';
import compile from '../../utils/Compile/compile';
import template from './editSettingsForm.tpl';
import State from '../../utils/State/State';
import { TProps } from '../../types/types';

const state = new State();

export default class EditSettingsForm extends Block {
  constructor(props: TProps) {
    super(props, 'form', 'settings__form');
  }

  componentDidMount() {
    const updater = () => {
      this.setProps(state.get('settings'));
    };

    state.registerComponent('settings', updater);
  }

  render() {
    return compile(template, { ...this.props });
  }
}
