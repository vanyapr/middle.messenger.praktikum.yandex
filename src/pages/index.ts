import Router from '../utils/Router/Router';

// @ts-ignore
import loginForm from './login';
import signUpForm from './signUp';
import app from './app';
import settings from './settings';
import editSettings from './editSettings';
import editPassword from './editPassword';
import page404 from './404';
import page500 from './500';

// Объявили роутер
// TODO: передавать в роутер 404 страницу и 500 страницу
const router = new Router();

// Объявили роутер
router
  .use('/', loginForm)
  .use('/signup', signUpForm)
  .use('/chat', app)
  .use('/settings', settings)
  .use('/settings-edit', editSettings)
  .use('/settings-edit-password', editPassword)
  .use('/404', page404)
  .use('/500', page500);

// Вернули ошибку
router.run();
