import LoginForm from '../components/loginForm';
import validateInput from '../utils/validateInput/validateInput';
import Form from '../utils/Form/Form';
import Router from '../utils/Router/Router';
import Auth from '../connectors/Auth';
import State from '../utils/State/State';
import ChatsAPI from '../connectors/ChatsAPI';
import Input from '../components/input/input';
import { loginValidator, passwordValidator, notEmptyValidator } from '../settings/validators';
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
  value: 'snowflaxxxx',
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
  value: 'adrf43gdA',
  events: {
    keyup() {
      const input = this.querySelector('.input');
      const error = this.querySelector('.form__error');
      const validity = validateInput(input, notEmptyValidator, 'input_state_valid', 'input_state_invalid');

      if (!validity) {
        error.textContent = 'Введите пароль';
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
              // state.set('user', { authorised: true });
              // Вернем свойства юзера
              return auth.getUserData();
            }
            state.set('loginForm', { error: 'Неверные имя пользователя или пароль' });
            return false;
          }).then((userDataRequest: XMLHttpRequest) => {
            console.log(userDataRequest);
            // Если данные пришли, мы переходим на роут чата записав данные в стейт
            if (userDataRequest.status === 200) {
              const userSettings: Record<string, any> = JSON.parse(userDataRequest.responseText);
              console.log(userSettings);
              if (!userSettings.avatar) {
                userSettings.avatar = image;
              } else {
                // Перезаписали аватар на случай авторизации
                userSettings.avatar = `https://ya-praktikum.tech/api/v2/resources${userSettings.avatar}`;
              }
              state.set('settings', userSettings);

              // TODO: Получить данные чатов
              const chats = new ChatsAPI();
              return chats.getChats();
            }
            // Иначе данные не пришли, и мы запишем ошибку
            form.enableButton();
            state.set('loginForm', { error: 'Ошибка получения данных пользователя' });
            throw new Error('Ошибка получения данных пользователя');
          }).then((response: XMLHttpRequest) => {
            console.log(response);
            if (response.status === 200) {
              const chats = JSON.parse(response.responseText);
              console.log(chats);
              state.set('chats', { list: chats });
              router.go('/chat');
            }
          })
          .catch((error) => {
            console.log(error);
            state.set('user', { authorised: false });
            form.enableButton();
            state.set('loginForm', {
              error: 'При отправке данных возникла ошибка',
            });
            router.go('/500');
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
