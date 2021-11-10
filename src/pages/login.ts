import LoginForm from '../components/loginForm';

// Передадим в пропс функцию обработчик сабмита формы
import validateInput from '../utils/validateInput/validateInput';
import Form from '../utils/Form/Form';
import Router from '../utils/Router/Router';

// Валидаторы
import {
  loginValidator,
  passwordValidator,
} from '../settings/validators';

// Объявили роутер
const router = new Router();

export default new LoginForm({
  title: 'Авторизация',
  buttonText: 'Войти',
  linkText: 'Зарегистрироваться',
  handleSubmit(event: Event) {
    event.preventDefault();
    // Собираем данные формы
    const form = new Form(
      this,
      'input_state_valid',
      'input_state_invalid',
      'button',
    );

    const formData = form.collectData();

    if (formData) {
      console.log(formData);
    } else {
      console.log('Форма невалидна и данных нет');
    }
  },
  loginValidator,
  passwordValidator,
  validate() {
    validateInput(this, 'input_state_valid', 'input_state_invalid');
  },
  goRoute() {
    router.go('/signup');
  },
},

'#container');
