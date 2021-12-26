import Block from '../../utils/Block/Block';
import compile from '../../utils/Compile/compile';
import template from './openSettingsButton.tpl';
import '../../styles/components/settings-button/settings-button.scss';

export default class OpenSettingsButton extends Block {
  constructor(props: any) {
    super(props, 'button', 'settings-button');
  }

  render() {
    return compile(template, { ...this.props });
  }
}
