import BackButton from '../components/backButton';
import Settings from '../components/settings';
import Container from '../components/container/container';
import Router from '../utils/Router/Router';
import State from '../utils/State/State';
import Auth from '../connectors/Auth';
import SettingsButton from '../components/settingsButton';
import LogoutButton from '../components/logoutButton';

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

// FIXME: Проблема: при монтировании компонента он не обновлен (с пустыми пропсами)
// А при обновлении пропсов компонент не вызывает повторный рендер
// (при переходе по роуту - тоже)
const settings = new Settings({
  ...userSettings,
  editSettingsButton,
  editPasswordButton,
  logoutButton,
});

export default new Container({
  aside: backButton,
  main: settings,
});
