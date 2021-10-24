// Стили по умолчанию
import '../styles/vendor/normalize.css';
import '../styles/vendor/fonts/Inter/inter.css';
import '../styles/components/root/root.scss';
import '../styles/components/container/container.scss';

import LoginForm from '../components/loginForm';

// Передадим в пропс функцию обработчик сабмита формы

// @ts-ignore
const loginForm = new LoginForm({
  title: 'Авторизация',
  buttonText: 'Войти',
  linkText: 'Зарегистрироваться',
  handleSubmit() {
    console.log('Form hovered');
    console.log(this);
  },
  handleHover() {
    console.log('hovered');
    console.log(this);
  },
},

'#container');
