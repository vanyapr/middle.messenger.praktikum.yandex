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
import Auth from '../connectors/Auth';

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

      // const { login, password } = formData;

      const auth = new Auth();
      // const data = JSON.stringify()

      auth.signIn(formData).then((responce:XMLHttpRequest) => {
        console.log(responce.response);
        return JSON.parse(responce.response);
      }).then((parsedResponce) => {
        console.log(parsedResponce);
      }).catch((error) => {
        console.log(error);
      });
    } else {
      console.log('Форма невалидна и данных нет');
    }
  },
  loginValidator,
  passwordValidator,
  validate() {
    validateInput(this, 'input_state_valid', 'input_state_invalid', '.button');
  },
  goRoute() {
    router.go('/signup');
  },
},

'#container');
