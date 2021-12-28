import Block from '../../utils/Block/Block';
import compile from '../../utils/Compile/compile';
import template from './settingsButton.tpl';
import { TProps } from '../../types/types';

export default class SettingsButton extends Block {
  constructor(props: TProps) {
    super(props, 'div', 'settings__group');
  }

  render() {
    return compile(template, { ...this.props });
  }
}
