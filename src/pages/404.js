// Стили
import '../vendor/normalize.css';
import '../vendor/fonts/Inter/inter.css';
import '../components/root/root.scss';

// Движок рендера
import show from '../utils/render/index';

// Темплейт
import { error } from '../components/error';

show(
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

console.log('test');
