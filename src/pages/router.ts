// Стили по умолчанию
import '../styles/vendor/normalize.css';
import '../styles/vendor/fonts/Inter/inter.css';
import '../styles/components/root/root.scss';
import '../styles/components/container/container.scss';

// Компонент
import LoginForm from '../components/loginForm';
import SignUpForm from '../components/signUpForm';

// Передадим в пропс функцию обработчик сабмита формы
import collectFormData from '../utils/collectFormData/collectFormData';
import validateInput from '../utils/validateInput/validateInput';

import Router from '../utils/Router/Router';

// Валидаторы
import {
  emailValidator,
  loginValidator,
  nameValidator,
  passwordValidator, phoneValidator,
} from '../settings/validators';

// Объявили роутер
const router = new Router();

// @ts-ignore
const loginForm = new LoginForm({
  title: 'Авторизация',
  buttonText: 'Войти',
  linkText: 'Зарегистрироваться',
  handleSubmit(event: Event) {
    event.preventDefault();
    // Передали форму для сбора данных
    collectFormData(this, 'input_state_valid', 'input_state_invalid');
  },
  loginValidator,
  passwordValidator,
  validate() {
    validateInput(this, 'input_state_valid', 'input_state_invalid');
  },
  goRoute() {
    console.log('Переход по роуту');
    router.go('/signup');
  },
},

'#container');

// @ts-ignore
const registerForm = new SignUpForm({
  title: 'Регистрация',
  buttonText: 'Зарегистрироваться',
  linkText: 'Войти',
  handleSubmit(event: Event) {
    event.preventDefault();
    // Передали форму в обработчик
    collectFormData(this, 'input_state_valid', 'input_state_invalid');
  },
  loginValidator,
  passwordValidator,
  nameValidator,
  emailValidator,
  phoneValidator,

  validate() {
    validateInput(this, 'input_state_valid', 'input_state_invalid');
  },
  goRoute() {
    console.log('Переход по роуту');
    router.go('/login');
  },
},

'#container');

router
  .use('/login', loginForm)
  .use('/signup', registerForm);

router.go('/login');

router.run();
