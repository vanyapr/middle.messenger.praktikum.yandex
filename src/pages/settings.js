// Стили по умолчанию
import '../styles/vendor/normalize.css';
import '../styles/vendor/fonts/Inter/inter.css';
import '../styles/components/root/root.scss';
import '../styles/components/container/container.scss';

// Движок рендера
import show from '../utils/render/index';

// Темплейт
import { backButton } from '../templates/components/backButton';
import { settings } from '../templates/components/settings';

import image from '../templates/components/settings/avatar.jpg';

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
  settings,
  {
    name: 'Иван',
    avatar: image,
  },
  '#container',
);
