import LoginForm from '../components/loginForm';
import validateInput from '../utils/validateInput/validateInput';
import Form from '../utils/Form/Form';
import Router from '../utils/Router/Router';
import Auth from '../connectors/Auth';
import State from '../utils/State/State';
import Chats from '../connectors/Chats';
import Input from '../components/input/input';
import { loginValidator, passwordValidator } from '../settings/validators';
// @ts-ignore
import image from '../../static/avatar.jpg';

// Объявили роутер
const router = new Router();

// Стейт приложения
const state = new State();

// TODO: Собирать состояние формы из стейта приложения, чтобы не делать дополнительные валидаторы
const loginInput = new Input({
  name: 'login',
  type: 'text',
  textName: 'Пользователь',
  errorText: '',
  value: 'snowflax',
  events: {
    keyup() {
      // TODO: Записывать в стейт валидность инпутов
      const input = this.querySelector('.input');
      const error = this.querySelector('.form__error');
      const validity = validateInput(input, loginValidator, 'input_state_valid', 'input_state_invalid');

      if (!validity) {
        error.textContent = 'Минимум 4 знака: буквы, цифры или символы \'-\' и \'_\'';
      }
    },
  },
});

const passwordInput = new Input({
  name: 'password',
  type: 'password',
  textName: 'Пароль',
  errorText: '',
  value: 'adrf43gd',
  events: {
    keyup() {
      // TODO: Записывать в стейт валидность инпутов
      const input = this.querySelector('.input');
      const error = this.querySelector('.form__error');
      const validity = validateInput(input, passwordValidator, 'input_state_valid', 'input_state_invalid');

      if (!validity) {
        error.textContent = 'Минимум 8 знаков. Обязательны ЗАГЛАВНАЯ буква и цифра';
      }
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
  events: {
    submit(event: Event) {
      console.log('Submit');
      event.preventDefault();
      console.log(event.target);
      // Собираем данные формы
      const form = new Form(
        this,
        'input_state_valid',
        'input_state_invalid',
        'button',
      );

      const formData = form.collectData();

      if (formData) {
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
              }
              state.set('settings', userSettings);

              // TODO: Получить данные чатов
              const chats = new Chats();
              return chats.getChats();
            }
            form.enableButton();
            state.set('loginForm', { error: 'Ошибка получения данных пользователя' });
            throw new Error('Ошибка получения данных пользователя');

          // Иначе данные не пришли, и мы запишем ошибку
          }).then((response: XMLHttpRequest) => {
            console.log(response);
            if (response.status === 200) {
              const chats = JSON.parse(response.responseText);
              console.log(chats);
              state.set('chats', chats);
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
        console.log('Форма невалидна и данных нет');
      }
    },

    goRoute() {
      router.go('/signup');
    },
  },
});
