// Стили по умолчанию
import '../styles/vendor/normalize.css';
import '../styles/vendor/fonts/Inter/inter.css';
import '../styles/components/root/root.scss';
import '../styles/components/container/container.scss';

// Движок рендера
import show from '../utils/render/index';

// Темплейт
import { loginForm } from '../templates/components/signUpForm';

show(
  loginForm,
  {
    title: 'Регистрация',
    buttonText: 'Зарегистрироваться',
    linkText: 'Войти',
  },

  '#container',
);
