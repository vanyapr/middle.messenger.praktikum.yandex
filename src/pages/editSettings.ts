import BackButton from '../components/backButton';
import EditSettings from '../components/editSettings';
import User from '../connectors/User';
import validateInput from '../utils/validateInput/validateInput';
import Router from '../utils/Router/Router';
import {
  emailValidator,
  loginValidator,
  nameValidator,
  passwordValidator,
  phoneValidator,
} from '../settings/validators';
import Container from '../components/container/container';
import Form from '../utils/Form/Form';
import State from '../utils/State/State';
// @ts-ignore
import image from '../../static/avatar.jpg';
import SettingsInput from '../components/settingsInput';
import EditPasswordForm from '../components/editPasswordForm';
import EditSettingsForm from '../components/editSettingsForm';

const router = new Router();

const backButton = new BackButton({
  buttonText: 'Вернуться назад',
  events: {
    click() {
      router.back();
    },
  },
});

const state = new State();
const settings = state.get('settings');
// Будем хранить состояние формы локально
const formState: Record<string, boolean> = {};

const usernameInput = new SettingsInput({
  name: 'login',
  type: 'text',
  textName: 'Имя пользователя',
  errorText: '',
  value: '',
  events: {
    keyup() {
      const input = this.querySelector('.settings__value');
      const error = this.querySelector('.settings__error');
      const validity = validateInput(input, loginValidator, 'settings__value_state_valid', 'settings__value_state_invalid');

      if (!validity) {
        error.textContent = 'Минимум 4 знака: буквы, цифры или символы \'-\' и \'_\'';
        formState.loginIsValid = false;
      } else {
        formState.loginIsValid = true;
      }
    },
  },
});

const emailInput = new SettingsInput({
  name: 'email',
  type: 'text',
  textName: 'Адрес электронной почты',
  errorText: '',
  value: '',
  events: {
    keyup() {
      const input = this.querySelector('.settings__value');
      const error = this.querySelector('.settings__error');
      const validity = validateInput(input, emailValidator, 'settings__value_state_valid', 'settings__value_state_invalid');

      if (!validity) {
        error.textContent = 'Введите корректный адрес электронной почты';
        formState.loginIsValid = false;
      } else {
        formState.loginIsValid = true;
      }
    },
  },
});

const nickNameInput = new SettingsInput({
  name: 'display_name',
  type: 'text',
  textName: 'Имя в чате (никнейм)',
  errorText: '',
  value: '',
  events: {
    keyup() {
      const input = this.querySelector('.settings__value');
      const error = this.querySelector('.settings__error');
      const validity = validateInput(input, nameValidator, 'settings__value_state_valid', 'settings__value_state_invalid');

      if (!validity) {
        error.textContent = 'Минимум 4 буквы, цифры или символы \'-\' и \'_\'';
        formState.loginIsValid = false;
      } else {
        formState.loginIsValid = true;
      }
    },
  },
});

const firstNameInput = new SettingsInput({
  name: 'first_name',
  type: 'text',
  textName: 'Ваше имя',
  errorText: '',
  value: '',
  events: {
    keyup() {
      const input = this.querySelector('.settings__value');
      const error = this.querySelector('.settings__error');
      const validity = validateInput(input, nameValidator, 'settings__value_state_valid', 'settings__value_state_invalid');

      if (!validity) {
        error.textContent = 'Введите имя с Заглавной буквы';
        formState.loginIsValid = false;
      } else {
        formState.loginIsValid = true;
      }
    },
  },
});

const secondNameInput = new SettingsInput({
  name: 'second_name',
  type: 'text',
  textName: 'Ваше имя',
  errorText: '',
  value: '',
  events: {
    keyup() {
      const input = this.querySelector('.settings__value');
      const error = this.querySelector('.settings__error');
      const validity = validateInput(input, nameValidator, 'settings__value_state_valid', 'settings__value_state_invalid');

      if (!validity) {
        error.textContent = 'Введите фамилию с Заглавной буквы';
        formState.loginIsValid = false;
      } else {
        formState.loginIsValid = true;
      }
    },
  },
});

const phoneInput = new SettingsInput({
  name: 'phone',
  type: 'text',
  textName: 'Номер телефона',
  errorText: '',
  value: '',
  events: {
    keyup() {
      const input = this.querySelector('.settings__value');
      const error = this.querySelector('.settings__error');
      const validity = validateInput(input, phoneValidator, 'settings__value_state_valid', 'settings__value_state_invalid');

      if (!validity) {
        error.textContent = 'Минимум десять цифр';
        formState.loginIsValid = false;
      } else {
        formState.loginIsValid = true;
      }
    },
  },
});

const editSettingsForm = new EditSettingsForm({
  error: '',
  usernameInput,
  emailInput,
  nickNameInput,
  firstNameInput,
  secondNameInput,
  phoneInput,

  events: {
    submit(event: Event) {
      event.preventDefault();

      // Собираем данные формы
      const form = new Form(
        this,
        '.button',
      );

      const formData = form.collectData();

      if (formData) {
        form.disableButton();
        const user = new User();
        return user.saveProfile(formData).then((response: XMLHttpRequest) => {
          console.log(response);
          if (response.status === 200) {
            console.log();
            const newSettings = JSON.parse(response.responseText);

            if (!newSettings.avatar) {
              newSettings.avatar = image;
            }
            newSettings.error = '';
            state.set('settings', newSettings);
            form.enableButton();
          } else {
            state.set('settings', { error: 'Ошибка сохранения данных' });
          }
        }).catch((error: any) => {
          console.log(error);
          form.enableButton();
          router.go('/500');
        });
      }
      form.enableButton();
      console.log('Форма невалидна и данных нет');
    },
  },
});

const editSettings = new EditSettings({
  ...settings,
  editSettingsForm,
  error: '',
});

export default new Container({
  aside: backButton,
  main: editSettings,
});
