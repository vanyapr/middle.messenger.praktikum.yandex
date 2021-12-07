import BackButton from '../components/backButton';
import Settings from '../components/settings';
import Container from '../components/container/container';
import Router from '../utils/Router/Router';
import State from '../utils/State/State';
import Auth from '../connectors/Auth';
import SettingsButton from '../components/settingsButton';
import LogoutButton from '../components/logoutButton';
import Form from '../utils/Form/Form';
import PopUp from '../components/popUp';
import AvatarUploadForm from '../components/avatarUploadForm';
import Avatar from '../components/avatar';

const auth = new Auth();
const router = new Router();
const state = new State();
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
          state.delete('settings');
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
      router.back();
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

export default new Container({
  aside: backButton,
  main: settings,
});
