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
import FileInput from '../components/fileInput';
import FileText from '../components/fileText';

const router = new Router();

const backButton = new BackButton({
  buttonText: 'Вернуться назад',
  events: {
    click() {
      console.log('Вернуться назад');
      router.go('/settings');
    },
  },
});

const state = new State();
let settings = state.get('settings');

// Фикс на случай, если стейт приложения удален
if (!settings) {
  settings = {};
  settings.login = '';
  settings.email = '';
}

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
          if (response.status === 200) {
            const newSettings = JSON.parse(response.responseText);

            if (!newSettings.avatar) {
              newSettings.avatar = image;
            } else {
              newSettings.avatar = `https://ya-praktikum.tech/api/v2/resources${newSettings.avatar}`;
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
const avatarUploadText = new FileText({
  text: 'Выбрать файл на компьютере',
});

const avatarFileInput = new FileInput({
  id: 'avatar',
  text: avatarUploadText,
  events: {
    change(event: any) {
      const file = event.target.files[0];
      if (file.size > 650000) {
        state.set('avatarUploadForm', { error: 'Файл слишком большой' });
      } else {
        state.set('avatarUploadForm', { error: '' });
      }

      state.set('fileText', { text: event.target.files[0].name });
    },
  },
});

const uploadAvatarForm = new AvatarUploadForm({
  title: 'Загрузить файл',
  buttonText: 'Сохранить изменения',
  fileUploadInput: avatarFileInput,
  error: '',

  events: {
    submit(event: Event) {
      event.preventDefault();

      // Собираем данные формы
      const form = new Form(
        this,
        'button',
      );

      // Инпут с файлом и сам файл
      const fileInput = document.querySelector('#avatar') as HTMLFormElement;
      const file = fileInput.files[0];

      if (file) {
        // Данные формы
        const formData = new FormData();
        formData.append('avatar', file);

        form.disableButton();

        // Отправка запроса
        const user = new User();

        user.changeAvatar(formData).then((responce: XMLHttpRequest) => {
          const parsedResponce = JSON.parse(responce.responseText);
          parsedResponce.avatar = `https://ya-praktikum.tech/api/v2/resources${parsedResponce.avatar} `;
          state.set('settings', parsedResponce);
          state.set('avatarUploadForm', { error: '' });
          editAvatarPopUp.hide();
        }).catch((error) => {
          state.set('avatarUploadForm', { error });
          form.enableButton();
        });
      } else {
        state.set('avatarUploadForm', { error: 'Выберите файл для загрузки' });
      }
    },
  },
});

const editAvatarPopUp = new PopUp({
  children: uploadAvatarForm,
  events: {
    click(event: any) {
      event.stopPropagation();

      if (event.target.classList.contains('popup__close') || event.target.className === 'popup') {
        console.log('Нажата кнопка закрытия');
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
