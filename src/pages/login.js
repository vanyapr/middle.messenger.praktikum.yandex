// Стили по умолчанию
import '../styles/vendor/normalize.css';
import '../styles/vendor/fonts/Inter/inter.css';
import '../styles/components/root/root.scss';
import '../styles/components/container/container.scss';

// Движок рендера
import render from '../utils/render';

// Темплейт
import { loginForm } from '../templates/components/loginForm';

render(
  loginForm,
  {
    title: 'Авторизация',
    buttonText: 'Войти',
    linkText: 'Зарегистрироваться',
  },

  '#container',
);
