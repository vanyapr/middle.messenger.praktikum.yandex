// Стили
import '../styles/vendor/normalize.css';
import '../styles/vendor/fonts/Inter/inter.css';
import '../styles/components/root/root.scss';
import '../styles/components/container/container.scss';

// Движок рендера
import show from '../utils/render/index';

// Темплейт
import { error } from '../templates/components/error/index.js';

show(
  error,
  { status: 500,
    title: 'Мы уже фиксим',
    buttonText: 'Назад к чатам',
    action() {
      window.history.back();
    },
  },
  '#container',
);
