import BackButton from '../components/backButton';
import EditPassword from '../components/editPassword';
// @ts-ignore
import image from '../../static/avatar.jpg';
import { passwordValidator } from '../settings/validators';
import validateInput from '../utils/validateInput/validateInput';
import Index from '../components/container';
import Router from '../utils/Router/Router';
import Form from '../utils/Form/Form';
import State from '../utils/State/State';
import User from '../connectors/User';
import SettingsInput from '../components/settingsInput';
import EditPasswordForm from '../components/editPasswordForm';
import AvatarUploadForm from '../components/avatarUploadForm';
import PopUp from '../components/popUp';
import Avatar from '../components/avatar';

const router = new Router();
const state = new State();
const settings = state.get('settings');

// Будем хранить состояние формы локально
const formState: Record<string, boolean> = {};

const backButton = new BackButton({
  buttonText: 'Вернуться назад',
  events: {
    click() {
      router.go('/settings');
    },
  },
});

const oldPasswordInput = new SettingsInput({
  name: 'oldPassword',
  type: 'password',
  textName: 'Старый пароль',
  errorText: '',
  value: '',
  events: {
    keyup() {
      const input = this.querySelector('.settings__value');
      const error = this.querySelector('.settings__error');
      const validity = validateInput(input, passwordValidator, 'settings__value_state_valid', 'settings__value_state_invalid');

      if (!validity) {
        error.textContent = 'Минимум 4 знака: буквы, цифры или символы \'-\' и \'_\'';
        formState.oldPasswordIsValid = false;
      } else {
        formState.oldPasswordIsValid = true;
      }
    },
  },
});

const newPasswordInput = new SettingsInput({
  name: 'newPassword',
  type: 'password',
  textName: 'Новый пароль',
  errorText: '',
  value: '',
  events: {
    keyup() {
      const input = this.querySelector('.settings__value');
      const error = this.querySelector('.settings__error');
      const validity = validateInput(input, passwordValidator, 'settings__value_state_valid', 'settings__value_state_invalid');

      if (!validity) {
        error.textContent = 'Минимум 4 знака: буквы, цифры или символы \'-\' и \'_\'';
        formState.newPasswordIsValid = false;
      } else {
        formState.newPasswordIsValid = true;
      }
    },
  },
});

const newPasswordInput2 = new SettingsInput({
  name: 'newPassword2',
  type: 'password',
  textName: 'Повторите новый пароль',
  errorText: '',
  value: '',
  events: {
    keyup() {
      const input = this.querySelector('.settings__value');
      const error = this.querySelector('.settings__error');
      const validity = validateInput(input, passwordValidator, 'settings__value_state_valid', 'settings__value_state_invalid');

      if (!validity) {
        error.textContent = 'Минимум 4 знака: буквы, цифры или символы \'-\' и \'_\'';
        formState.newPassword2IsValid = false;
      } else {
        formState.newPassword2IsValid = true;
      }
    },
  },
});

const editPasswordForm = new EditPasswordForm({
  oldPasswordInput,
  newPasswordInput,
  newPasswordInput2,
  ...settings,
  events: {
    submit(event: Event) {
      event.preventDefault();

      // Собираем данные формы
      const form = new Form(
        this,
        '.button',
      );

      const formData = form.collectData();

      // adrf43gdA
      if (formData) {
        form.disableButton();
        // Проверим равны ли новые пароли
        if (formData.newPassword === formData.newPassword2) {
          const { oldPassword, newPassword } = formData;
          const passwords = { oldPassword, newPassword };

          // Делаем запрос
          const user = new User();
          user.changePassword(passwords).then((response: XMLHttpRequest) => {
            if (response.status === 200) {
              state.set('settings', { error: '' });
              form.enableButton();
            } else {
              throw new Error(`${response.status}: ${response.statusText}`);
            }
          }).catch((error) => {
            form.enableButton();
            console.log(error);
            state.set('settings', { error: 'Ошибка изменения пароля' });
          });
        } else {
          console.log('Пароли не совпали');
          state.set('settings', { error: 'Пароли не совпадают' });
          form.enableButton();
        }
      } else {
        console.log('Форма невалидна и данных нет');
      }
    },
    validate() {
      validateInput(this, 'settings__value_state_valid', 'settings__value_state_invalid', '.button');
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

const editPassword = new EditPassword({
  ...settings,
  editPasswordForm,
  avatarBlock,
  editAvatarPopUp,
});

export default new Index({
  aside: backButton,
  main: editPassword,
});
