// Темплейт
import BackButton from '../components/backButton';
import Settings from '../components/settings';

// Импорт картинок
// @ts-ignore
import image from '../../static/avatar.jpg';
import Container from '../components/container/container';
import Router from '../utils/Router/Router';
const router = new Router();

const backButton = new BackButton({
  buttonText: 'Вернуться назад',
  back() {
    router.back();
  },
});

const settings = new Settings({
  name: 'Иван',
  avatar: image,
  back() {
    router.back();
  },
  editSettings() {
    router.go('/settings-edit');
  },
  editPassword() {
    router.go('/settings-edit-password');
  },
});

export default new Container({
  aside: backButton,
  main: settings,
}, '#container');
