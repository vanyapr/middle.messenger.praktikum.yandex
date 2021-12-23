import BackButton from '../components/backButton';
import Settings from '../components/settings';
import Index from '../components/container';
import Router from '../utils/Router/Router';
import State from '../utils/State/State';
import Auth from '../connectors/Auth';
import SettingsButton from '../components/settingsButton';
import LogoutButton from '../components/logoutButton';
import Form from '../utils/Form/Form';
import PopUp from '../components/popUp';
import AvatarUploadForm from '../components/avatarUploadForm';
import Avatar from '../components/avatar';
import User from '../connectors/User';
import FileInput from '../components/fileInput';
import FileText from '../components/fileText';

const auth = new Auth();
const router = new Router();
const state = new State();
// Отправка запроса
const user = new User();

const userSettings = state.get('settings');

const editSettingsButton = new SettingsButton({
  buttonText: 'Изменить данные',
  events: {
    click() {
      router.go('/settings-edit');
    },
  },
});

const editPasswordButton = new SettingsButton({
  buttonText: 'Изменить пароль',
  events: {
    click() {
      router.go('/settings-edit-password');
    },
  },
});

const logoutButton = new LogoutButton({
  buttonText: 'Выйти',
  events: {
    click() {
      auth.logOut().then((response: XMLHttpRequest) => {
        if (response.status === 200) {
          // Удалим стейт при логауте
          localStorage.removeItem('state');
          state.set('user', { authorised: true });
          router.go('/');
        } else {
          router.go('/500');
        }
      }).catch((error) => {
        console.log(error);
        router.go('/500');
      });
    },
  },
});

const backButton = new BackButton({
  buttonText: 'Вернуться назад',
  events: {
    click() {
      router.go('/chat');
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

        user.changeAvatar(formData).then((responce: XMLHttpRequest) => {
          const parsedResponce = JSON.parse(responce.responseText);
          parsedResponce.avatar = `https://ya-praktikum.tech/api/v2/resources${parsedResponce.avatar}`;
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
  ...userSettings,
  events: {
    click() {
      editAvatarPopUp.show();
    },
  },
});
// Конец редактирования аватара

const settings = new Settings({
  avatarBlock,
  ...userSettings,
  editSettingsButton,
  editPasswordButton,
  logoutButton,
  editAvatarPopUp,
});

export default new Index({
  aside: backButton,
  main: settings,
});
