import Block from '../../utils/Block/Block';
import Template from '../../utils/Templater/Template';
import render from '../../utils/Templater';
import popUp from './popUp.tpl';
import '../../styles/components/popup/popup.scss';

export default class PopUp extends Block {
  render(): Template {
    return render(popUp, this.props, this.container);
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
