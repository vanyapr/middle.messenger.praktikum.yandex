import template from './header.tpl';
import Block from '../../utils/Block/Block';
import '../../styles/components/header/header.scss';
import compile from '../../utils/Compile/compile';
import State from '../../utils/State/State';
import { TProps } from '../../types/types';

// Стейт приложения
const state = new State();

export default class Header extends Block {
  constructor(props: TProps) {
    super(props, 'header', 'header');
  }

  componentDidMount() {
    const updater = () => {
      this.setProps(state.get('header'));
    };

    state.registerComponent('header', updater);
  }

  render() {
    return compile(template, { ...this.props });
  }
}
