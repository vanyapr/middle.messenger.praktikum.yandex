// Стили по умолчанию
import '../styles/vendor/normalize.css';
import '../styles/vendor/fonts/Inter/inter.css';
import '../styles/components/root/root.scss';
import '../styles/components/container/container.scss';
import '../styles/components/button/button.scss';

// Темплейт
import BackButton from '../components/backButton';
import EditSettings from '../components/editSettings';

// Импорт картинок
// @ts-ignore
import image from '../../static/avatar.jpg';

// @ts-ignore
const aside = new BackButton({
  buttonText: 'Вернуться назад',
  back() {
    window.history.back();
  },
},
'#container');

// @ts-ignore
const main = new EditSettings({
  name: 'Иван',
  avatar: image,
  back() {
    window.history.back();
  },
}, '#container');
