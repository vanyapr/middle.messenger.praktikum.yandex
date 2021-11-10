import LoginForm from '../components/loginForm';

// Передадим в пропс функцию обработчик сабмита формы
import validateInput from '../utils/validateInput/validateInput';
import Form from '../utils/Form/Form';
import Router from '../utils/Router/Router';

// Валидаторы
import { loginValidator, passwordValidator } from '../settings/validators';
import Auth from '../connectors/Auth';
import State from '../utils/State/State';

// Объявили роутер
const router = new Router();

// 1) задаём компоненту каким селектором выбирать данные и класть в пропсы,
// 2) запускаем componentDidMount,
// 3) выполняем render.

const state = new State();
// const {
//   title,
//   buttonText,
//   linkText,
// } = state.get('loginForm');

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
      state.set('loginForm', { title: 'NT' });
      console.log(formData);

      const auth = new Auth();

      // eslint-disable-next-line max-len
      auth.signIn(formData)
        .then((responce: XMLHttpRequest) => {
          console.log(responce);
          if (responce.status === 200) {
            return responce.responseText;
          }
          return JSON.parse(responce.responseText);
        })
        .then((parsedResponce) => {
          console.log(parsedResponce);
        })
        .catch((error) => {
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
