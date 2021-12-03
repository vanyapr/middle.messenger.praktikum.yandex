import '../../styles/components/settings/settings.scss';
import '../../styles/components/button/button.scss';
import Block from '../../utils/Block/Block';
import template from './editSettings.tpl';
import State from '../../utils/State/State';
import compile from '../../utils/Compile/compile';

const state = new State();

export default class EditSettings extends Block {
  constructor(props: any) {
    super(props, 'section', 'settings');
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
