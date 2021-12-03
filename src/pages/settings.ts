import BackButton from '../components/backButton';
import Settings from '../components/settings';
import Container from '../components/container/container';
import Router from '../utils/Router/Router';
import State from '../utils/State/State';
import Auth from '../connectors/Auth';

const auth = new Auth();
const router = new Router();
const state = new State();
const userSettings = state.get('settings');

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
  // name: 'Иван',
  // avatar: image,
  ...userSettings,
  events: {
    back() {
      router.back();
    },
    editSettings() {
      router.go('/settings-edit');
    },
    editPassword() {
      router.go('/settings-edit-password');
    },
    handleLogout() {
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

export default new Container({
  aside: backButton,
  main: settings,
});
