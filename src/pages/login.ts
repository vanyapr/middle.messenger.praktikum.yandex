// Стили по умолчанию
import '../styles/vendor/normalize.css';
import '../styles/vendor/fonts/Inter/inter.css';
import '../styles/components/root/root.scss';
import '../styles/components/container/container.scss';

import LoginForm from '../components/loginForm';

// Передадим в пропс функцию обработчик сабмита формы
import collectFormData from '../utils/collectFormData/collectFormData';
import validateInput from '../utils/validateInput/validateInput';
// Валидаторы
import {
  loginValidator,
  passwordValidator,
} from '../settings/validators';

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
},

'#container');
