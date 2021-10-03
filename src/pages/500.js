// Движок рендера
import show from '../utils/render/index';

// Стили
import '../vendor/normalize.css';
import '../vendor/fonts/Inter/inter.css';
import '../components/root/root.scss';

// Темплейт
import { error } from '../components/error/index.js';

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
