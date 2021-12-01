import Block from '../../utils/Block/Block';
import template from './app.tpl';
import compile from '../../utils/Compile/compile';
import Renderer from '../../utils/Render/Render';
import State from '../../utils/State/State';
// import '../../styles/components/container/container.scss';

// Стейт приложения
const state = new State();

export default class App extends Block {
  constructor(props: any) {
    super(props, 'div', 'container');
  }

  componentDidMount() {
    const updater = () => {
      this.setProps(state.get('app'));
    };

    state.registerComponent('app', updater);
  }

  render() {
    return compile(template, { ...this.props });
  }

  // Добавляем на страницу компоненты
  display() {
    const renderer = new Renderer('#root');
    renderer.render(this.getContent());
  }
}
