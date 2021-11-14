import '../../styles/components/settings/settings.scss';
import Block from '../../utils/Block/Block';
import Render from '../../utils/Render';

import settings from './settings.tpl';

import State from '../../utils/State/State';

const state = new State();

export default class Settings extends Block {
  componentDidMount() {
    const updater = () => {
      this.setProps(state.get('settings'));
    };

    state.registerComponent('settings', updater);
  }

  render() {
    return Render(settings, this.props, this.container);
  }
}
