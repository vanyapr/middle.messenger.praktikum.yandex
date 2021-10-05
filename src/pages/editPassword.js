// Стили по умолчанию
import '../styles/vendor/normalize.css';
import '../styles/vendor/fonts/Inter/inter.css';
import '../styles/components/root/root.scss';
import '../styles/components/container/container.scss';
import '../styles/components/button/button.scss';

// Движок рендера
import show from '../utils/render/index';

// Темплейт
import { backButton } from '../templates/components/backButton';
import { editPassword } from '../templates/components/editPassword';

// Импорт картинок
import image from '../templates/components/editSettings/avatar.jpg';

show(
  backButton,
  {
    buttonText: 'Вернуться назад',
    back() {
      window.history.back();
    },
  },

  '#container',
);

show(
  editPassword,
  {
    name: 'Иван',
    avatar: image,
    back() {
      window.history.back();
    },
  },
  '#container',
);
