import BackButton from '../components/backButton';
import EditSettings from '../components/editSettings';
import User from '../connectors/User';
import validateInput from '../utils/validateInput/validateInput';
import Router from '../utils/Router/Router';
import {
  emailValidator,
  loginValidator,
  nameValidator,
  phoneValidator,
} from '../settings/validators';
import Container from '../components/container/container';
import Form from '../utils/Form/Form';
import State from '../utils/State/State';
// @ts-ignore
import image from '../../static/avatar.jpg';
import SettingsInput from '../components/settingsInput';
import EditSettingsForm from '../components/editSettingsForm';
import AvatarUploadForm from '../components/avatarUploadForm';
import PopUp from '../components/popUp';
import Avatar from '../components/avatar';

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
  value: settings.login,
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
  value: settings.email,
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
  value: settings.display_name,
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
  value: settings.first_name,
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
  value: settings.second_name,
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
  value: settings.phone,
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

// Редактирование аватара
const uploadAvatarForm = new AvatarUploadForm({
  title: 'Загрузить файл',
  buttonText: 'Сохранить изменения',
  fileUploadInput: 'Выберите файл для загрузки',
  events: {
    submit(event: Event) {
      event.preventDefault();

      // Собираем данные формы
      const form = new Form(
        this,
        'button',
      );

      const formData = form.collectData();

      if (formData) {
        console.log(formData);
      } else {
        console.log('Форма невалидна и данных нет');
      }
    },
  },
});

const editAvatarPopUp = new PopUp({
  children: uploadAvatarForm,
  events: {
    click(event: any) {
      event.stopPropagation();
      console.log('Нажата кнопка закрытия');

      if (event.target.classList.contains('popup__close') || event.target.className === 'popup') {
        editAvatarPopUp.hide();
      }
    },
  },
});

const avatarBlock = new Avatar({
  ...settings,
  events: {
    click() {
      editAvatarPopUp.show();
    },
  },
});
// Конец редактирования аватара

const editSettings = new EditSettings({
  ...settings,
  avatarBlock,
  editSettingsForm,
  editAvatarPopUp,
  error: '',
});

export default new Container({
  aside: backButton,
  main: editSettings,
});
