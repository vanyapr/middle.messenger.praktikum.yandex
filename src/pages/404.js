// Стили
import '../styles/vendor/normalize.css';
import '../styles/vendor/fonts/Inter/inter.css';
import '../styles/components/root/root.scss';
import '../styles/components/container/container.scss';

// Движок рендера
import render from '../utils/render';

// Темплейт
import { error } from '../templates/components/error';

render(
  error,
  { status: 404,
    title: 'Не туда попали',
    buttonText: 'Назад к чатам',
    action() {
      window.history.back();
    },
  },

  '#container',
);
