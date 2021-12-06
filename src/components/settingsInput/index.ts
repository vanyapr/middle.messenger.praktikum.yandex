import Block from '../../utils/Block/Block';
import template from './settingsInput.tpl';
import compile from '../../utils/Compile/compile';

export default class SettingsInput extends Block {
  constructor(props: any) {
    super(props, 'div', 'settings__group');
  }

  render() {
    return compile(template, { ...this.props });
  }
}
