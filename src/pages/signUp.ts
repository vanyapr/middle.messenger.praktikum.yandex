// Стили по умолчанию
import '../styles/vendor/normalize.css';
import '../styles/vendor/fonts/Inter/inter.css';
import '../styles/components/root/root.scss';
import '../styles/components/container/container.scss';

// Темплейт
import LoginForm from '../components/signUpForm';
import collectFormData from '../utils/collectFormData/collectFormData';
// Валидаторы
import {
  emailValidator,
  loginValidator,
  nameValidator,
  passwordValidator, phoneValidator,
} from '../settings/validators';
import validateInput from '../utils/validateInput/validateInput';

// @ts-ignore
const loginForm = new LoginForm({
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
},

'#container');
