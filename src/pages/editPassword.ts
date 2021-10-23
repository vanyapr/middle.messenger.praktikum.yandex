// Стили по умолчанию
import '../styles/vendor/normalize.css';
import '../styles/vendor/fonts/Inter/inter.css';
import '../styles/components/root/root.scss';
import '../styles/components/container/container.scss';
import '../styles/components/button/button.scss';

// Темплейт
import BackButton from '../components/backButton';
import EditPassword from '../components/editPassword';

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
const editPassword = new EditPassword({
  name: 'Иван',
  avatar: image,
  back() {
    window.history.back();
  },
},
'#container');
