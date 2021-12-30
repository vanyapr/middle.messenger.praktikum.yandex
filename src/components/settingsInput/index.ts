import Block from '../../utils/Block/Block';
import template from './settingsInput.tpl';
import compile from '../../utils/Compile/compile';
import { TProps } from '../../types/types';

export default class SettingsInput extends Block {
  constructor(props: TProps) {
    super(props, 'div', 'settings__group');
  }

  render() {
    return compile(template, { ...this.props });
  }
}
