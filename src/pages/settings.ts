// Стили по умолчанию
import '../styles/vendor/normalize.css';
import '../styles/vendor/fonts/Inter/inter.css';
import '../styles/components/root/root.scss';
import '../styles/components/container/container.scss';

// Темплейт
import BackButton from '../components/backButton';
import Settings from '../components/settings';

// Импорт картинок
// @ts-ignore
import image from '../../static/avatar.jpg';

// @ts-ignore
const backButton = new BackButton({
  buttonText: 'Вернуться назад',
  back() {
    window.history.back();
  },
},

'#container');

// @ts-ignore
export default new Settings({
  name: 'Иван',
  avatar: image,
  back() {
    window.history.back();
  },
  editSettings() {
    window.location.pathname = '/settings-edit.html';
  },
  editPassword() {
    window.location.pathname = '/settings-password.html';
  },
},
'#container');
