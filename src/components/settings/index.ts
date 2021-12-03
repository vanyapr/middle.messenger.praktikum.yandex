import '../../styles/components/settings/settings.scss';
import Block from '../../utils/Block/Block';
import template from './settings.tpl';
import State from '../../utils/State/State';
import compile from '../../utils/Compile/compile';
import Renderer from '../../utils/Render/Render';

const state = new State();

export default class Settings extends Block {
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

  // Добавляем на страницу компоненты
  display() {
    console.log('Показываем');
    const renderer = new Renderer('#root');
    renderer.render(this.getContent());
  }
}
