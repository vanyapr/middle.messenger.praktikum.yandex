// Темплейт
import SignUpForm from '../components/signUpForm';
import Router from '../utils/Router/Router';

// Валидаторы
import {
  emailValidator,
  loginValidator,
  nameValidator,
  passwordValidator, phoneValidator,
} from '../settings/validators';
import validateInput from '../utils/validateInput/validateInput';
import Form from '../utils/Form/Form';

// Объявили роутер
const router = new Router();

export default new SignUpForm({
  title: 'Регистрация',
  buttonText: 'Зарегистрироваться',
  linkText: 'Войти',
  // formError: 'Ошибка отправки формы',
  handleSubmit(event: Event) {
    event.preventDefault();

    // Собираем данные формы
    const form = new Form(
      this,
      'input_state_valid',
      'input_state_invalid',
      '.button',
    );

    const formData = form.collectData();

    if (formData) {
      console.log(formData);

      // 1) Отправляем данные
      // 2) Авторизуемся
      // 3) Редиректимся
    } else {
      console.log('Форма невалидна и данных нет');
    }
  },
  loginValidator,
  passwordValidator,
  nameValidator,
  emailValidator,
  phoneValidator,

  validate() {
    validateInput(this, 'input_state_valid', 'input_state_invalid', '.button');
  },

  goRoute() {
    router.go('/');
  },
},

'#container');
