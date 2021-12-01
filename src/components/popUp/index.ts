import Block from '../../utils/Block/Block';
import template from './popUp.tpl';
import '../../styles/components/popup/popup.scss';
import compile from '../../utils/Compile/compile';
import State from '../../utils/State/State';

// Стейт приложения
const state = new State();

export default class PopUp extends Block {
  constructor(props: any) {
    super(props, 'div', 'popup');
  }

  componentDidMount() {
    const updater = () => {
      this.setProps(state.get('popup'));
    };

    state.registerComponent('popup', updater);
  }

  render() {
    return compile(template, { ...this.props });
  }

  // Показывает и скрывает попап
  toggle() {
    const popup = document.querySelector('.popup');

    if (popup) {
      popup.classList.toggle('popup_state_visible');
    }
  }

  // Удаляет попап
  delete() {
    const popupToDelete = document.querySelector('.popup');

    if (popupToDelete) {
      popupToDelete.classList.toggle('popup_state_visible');
    }
  }
}
