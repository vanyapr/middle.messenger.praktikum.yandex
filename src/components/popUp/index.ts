import Block from '../../utils/Block/Block';
import template from './popUp.tpl';
import '../../styles/components/popup/popup.scss';
import compile from '../../utils/Compile/compile';
import State from '../../utils/State/State';
import { TProps } from '../../types/types';

// Стейт приложения
const state = new State();

export default class PopUp extends Block {
  constructor(props: TProps) {
    super(props, 'div', 'popup');
  }

  componentDidMount() {
    const updater = () => {
      this.setProps(state.get('popup'));
    };

    state.registerComponent('popup', updater);

    // Скрываем при монтировании
    this.hide();

    // Записываем состояние в стейт приложения
    state.set('popup', { visible: false });
  }

  render() {
    return compile(template, { ...this.props });
  }
}
