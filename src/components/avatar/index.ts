import Block from '../../utils/Block/Block';
import compile from '../../utils/Compile/compile';
import template from './avatar.tpl';
import State from '../../utils/State/State';
import { TProps } from '../../types/types';
const state = new State();

export default class Avatar extends Block {
  constructor(props: TProps) {
    super(props, 'figure', 'settings__avatar');
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
