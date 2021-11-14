import '../../styles/components/settings/settings.scss';
import '../../styles/components/button/button.scss';
import Block from '../../utils/Block/Block';
import Render from '../../utils/Render';
import editSettings from './editSettings.tpl';
import State from '../../utils/State/State';

const state = new State();

export default class EditSettings extends Block {
  componentDidMount() {
    state.addState('settings', this.props);
  }

  componentDidUpdate() {
    console.log('Повторный рендер компонента из CDU (редактирование настроек');
    this.init();
  }

  render() {
    return Render(editSettings, this.props, this.container);
  }
}
