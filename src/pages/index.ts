// Стили
import '../styles/vendor/normalize.css';
import '../styles/vendor/fonts/Inter/inter.css';
import '../styles/components/root/root.scss';
import '../styles/components/container/container.scss';

import Router from '../utils/Router/Router';

import State from '../utils/State/State';
import loginForm from './login';
import signUpForm from './signUp';
import app from './app';
import settings from './settings';
import editSettings from './editSettings';
import editPassword from './editPassword';
import page404 from './404';
import page500 from './500';

// Объявили роутер
const router = new Router();

// Объявили доступные пути
router
  .use('/', loginForm)
  .use('/signup', signUpForm)
  .use('/chat', app)
  .use('/settings', settings)
  .use('/settings-edit', editSettings)
  .use('/settings-edit-password', editPassword)
  .use('/404', page404)
  .use('/500', page500);

// Запустили роутер
router.run();

const state = new State();

// Если юзер авторизован (есть настройки юзера в стейте), он попадает в чат
const userIsLoginned = state.get('settings');

if (userIsLoginned) {
  router.go('/chat');
}

// TODO:  Если нет настроек в стейте, мы выполняем логаут
