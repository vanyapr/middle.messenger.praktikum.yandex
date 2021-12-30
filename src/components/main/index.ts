import Block from '../../utils/Block/Block';
import compile from '../../utils/Compile/compile';
import template from './main.tpl';
import State from '../../utils/State/State';
import '../../styles/components/main/main.scss';
import { TProps } from '../../types/types';
// Стейт приложения
const state = new State();

export default class Main extends Block {
  constructor(props: TProps) {
    super(props, 'section', 'main');
  }

  componentDidMount() {
    const updater = () => {
      this.setProps(state.get('main'));
    };

    state.registerComponent('main', updater);
  }

  render() {
    return compile(template, { ...this.props });
  }
}
