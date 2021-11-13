// Темплейт
import SignUpForm from '../components/signUpForm';
import Router from '../utils/Router/Router';

// Валидаторы
import {
  emailValidator,
  loginValidator,
  nameValidator,
  passwordValidator,
  phoneValidator,
} from '../settings/validators';
import validateInput from '../utils/validateInput/validateInput';
import Form from '../utils/Form/Form';
import Auth from '../connectors/Auth';
import State from '../utils/State/State';

// Объявили роутер
const router = new Router();

// Стейт приложения
const state = new State();

export default new SignUpForm({
  title: 'Регистрация',
  buttonText: 'Зарегистрироваться',
  linkText: 'Войти',
  error: '',
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
      // Отключим кнопку
      form.disableButton();

      const auth = new Auth();

      // eslint-disable-next-line max-len
      auth.signUp(formData).then((response: XMLHttpRequest) => {
        console.log(response);
        if (response.status === 200) {
          state.set('user', { registered: true });
          state.set('signUpForm', {
            error: 'Вы успешно зарегистрировались',
          });
          router.go('/login');
        } else {
          state.set('loginForm', { error: response.responseText });
        }
      }).catch((error) => {
        console.log(error);
        state.set('user', { logined: false });
        form.enableButton();
        state.set('signUpForm', {
          error: 'При отправке данных возникла ошибка',
        });
        router.go('/500');
      });
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
