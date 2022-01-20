import LoginForm from '../components/loginForm';
import validateInput from '../utils/validateInput/validateInput';
import Form from '../utils/Form/Form';
import Router from '../utils/Router/Router';
import Auth from '../connectors/Auth';
import State from '../utils/State/State';
import ChatsAPI from '../connectors/ChatsAPI';
import Input from '../components/input/input';
import { loginValidator, passwordValidator } from '../settings/validators';
// @ts-ignore
import image from '../../static/avatar.jpg';
import Link from '../components/link/link';

// Объявили роутер
const router = new Router();

// Стейт приложения
const state = new State();

// Будем хранить состояние формы локально
const formState: Record<string, boolean> = {};

const loginInput = new Input({
  name: 'login',
  type: 'text',
  textName: 'Пользователь',
  errorText: '',
  value: '',
  events: {
    keyup() {
      const input = this.querySelector('.input');
      const error = this.querySelector('.form__error');
      const validity = validateInput(input, loginValidator, 'input_state_valid', 'input_state_invalid');

      if (!validity) {
        error.textContent = 'Минимум 4 знака: буквы, цифры или символы \'-\' и \'_\'';
        formState.loginIsValid = false;
      } else {
        formState.loginIsValid = true;
      }
    },
  },
});

const passwordInput = new Input({
  name: 'password',
  type: 'password',
  textName: 'Пароль',
  errorText: '',
  value: '',
  events: {
    keyup() {
      const input = this.querySelector('.input');
      const error = this.querySelector('.form__error');
      const validity = validateInput(input, passwordValidator, 'input_state_valid', 'input_state_invalid');

      if (!validity) {
        error.textContent = 'Минимум 8 знаков. Обязательны ЗАГЛАВНАЯ буква и цифра';
        formState.passwordIsValid = false;
      } else {
        formState.passwordIsValid = true;
      }
    },
  },
});

const registerLink = new Link({
  text: 'Зарегистрироваться',
  events: {
    click() {
      router.go('/signup');
    },
  },
});

export default new LoginForm({
  title: 'Авторизация',
  buttonText: 'Войти',
  linkText: 'Зарегистрироваться',
  error: '',
  loginInput,
  passwordInput,
  registerLink,
  events: {
    submit(event: Event) {
      event.preventDefault();

      // Объявили форму
      const form = new Form(
        this,
        '.button',
      );

      const { loginIsValid, passwordIsValid } = formState;

      if (loginIsValid && passwordIsValid) {
        // Собрали данные
        const formData = form.collectData();

        // Отключим кнопку
        form.disableButton();

        const auth = new Auth();

        auth.signIn(formData)
          .then((response: XMLHttpRequest) => {
            console.log(response);
            if (response.status === 200) {
              // Вернем свойства юзера
              return auth.getUserData();
            }

            if (response.status === 400) {
              return auth.logOut().then(() => auth.signIn(formData).then(() => auth.getUserData()));
            }

            throw new Error('Неверные имя пользователя или пароль');
          }).then((userDataRequest: XMLHttpRequest) => {
            // Если данные пришли, мы переходим на роут чата записав данные в стейт
            if (userDataRequest.status === 200) {
              const userSettings: Record<string, any> = JSON.parse(userDataRequest.responseText);
              if (!userSettings.avatar) {
                userSettings.avatar = image;
              } else {
                // Перезаписали аватар на случай авторизации
                userSettings.avatar = `https://ya-praktikum.tech/api/v2/resources${userSettings.avatar}`;
              }
              state.set('settings', userSettings);

              const chats = new ChatsAPI();
              return chats.getChats();
            }
            // Иначе данные не пришли, и мы запишем ошибку
            form.enableButton();
            throw new Error('Ошибка получения данных пользователя');
          }).then((response: XMLHttpRequest) => {
            if (response.status === 200) {
              const chats = JSON.parse(response.responseText);
              // Включили кнопку
              form.enableButton();
              state.set('chats', { chatsList: chats });
              router.go('/chat');
            }

            if (response.status === 400) {
              router.go('/chat');
            }
          })
          .catch((error) => {
            form.enableButton();
            state.set('loginForm', { error });
          });
      } else {
        console.log('Данные формы невалидны');
        state.set('loginForm', {
          error: 'Пожалуйста, заполните форму корректно',
        });
      }
    },
  },
});
