// Темплейт
import SignUpForm from '../components/signUpForm';
import collectFormData from '../utils/collectFormData/collectFormData';
import Router from '../utils/Router/Router';

// Валидаторы
import {
  emailValidator,
  loginValidator,
  nameValidator,
  passwordValidator, phoneValidator,
} from '../settings/validators';
import validateInput from '../utils/validateInput/validateInput';

// Объявили роутер
const router = new Router();

export default new SignUpForm({
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
    router.go('/');
  },
},

'#container');
