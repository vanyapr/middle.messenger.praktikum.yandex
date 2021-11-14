import LoginForm from '../components/loginForm';

// Передадим в пропс функцию обработчик сабмита формы
import validateInput from '../utils/validateInput/validateInput';
import Form from '../utils/Form/Form';
import Router from '../utils/Router/Router';

// Валидаторы
import { loginValidator, passwordValidator } from '../settings/validators';
import Auth from '../connectors/Auth';
import State from '../utils/State/State';
// @ts-ignore
import image from '../../static/avatar.jpg';

// Объявили роутер
const router = new Router();

// Стейт приложения
const state = new State();

// Если юзера авторизован, будем редиректить его в чат
// if (state.get('user').authorised === true) {
//   router.go('/chats');
// }

export default new LoginForm({
  title: 'Авторизация',
  buttonText: 'Войти',
  linkText: 'Зарегистрироваться',
  error: '',
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
            router.go('/chat');
          } else {
            form.enableButton();
            state.set('loginForm', { error: 'Ошибка получения данных пользователя' });
          }
          // Иначе данные не пришли, и мы запишем ошибку
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
