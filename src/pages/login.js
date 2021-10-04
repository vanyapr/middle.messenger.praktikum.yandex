// Стили
import '../styles/vendor/normalize.css';
import '../styles/vendor/fonts/Inter/inter.css';
import '../styles/components/root/root.scss';

// Движок рендера
import show from '../utils/render/index';

// Темплейт
import { loginForm } from '../templates/components/loginForm';

show(
  loginForm,
  { status: 404,
    title: 'Авторизация',
    buttonText: 'Войти',
    linkText: 'Зарегистрироваться',
  },

  '#container',
);
