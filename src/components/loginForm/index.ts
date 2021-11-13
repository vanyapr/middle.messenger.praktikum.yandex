import loginForm from './loginForm.tpl';
import Block from '../../utils/Block/Block';
import Render from '../../utils/Render';

import '../../styles/components/form/form.scss';
import '../../styles/components/button/button.scss';
import '../../styles/components/label/label.scss';
import '../../styles/components/input/input.scss';

import State from '../../utils/State/State';

const state = new State();

export default class LoginForm extends Block {
  componentDidMount() {
    state.addState('loginForm', this.props);
    // Компонент может сам подписаться на изменения
    // необходимых для него данных.

    // После их изменения будет вызван emit,
    // и компонент сможет перезапустить componentDidUpdate.

    // Создадим прокси от пропсов, которые получим?
    // При изменении пропсов вызовем this.setProps()

    // а) 1) Вызвать метод СТЕЙТА, который будет принимать функцию
    //    2) При апдейте пропсов внутри СТЕЙТА, будет вызываться эта функция
    //    3) Функция будет записывать новые пропсы на место старых в БЛОКЕ

    // б) 1) Передаем в стейт ссылку на пропсы БЛОКА
    //    2) При смене пропсов в СТЕЙТЕ перезаписываем пропсы БЛОКА
    //    3) Таким образом получаем сайд эффект и апдейт компонента?
  }

  render() {
    return Render(loginForm, this.props, this.container);
  }
}
