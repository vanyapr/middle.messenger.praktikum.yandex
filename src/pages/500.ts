// Стили
import '../styles/vendor/normalize.css';
import '../styles/vendor/fonts/Inter/inter.css';
import '../styles/components/root/root.scss';
import '../styles/components/container/container.scss';

// Компонент
import Error from '../components/error';

// @ts-ignore
const error500 = new Error({
  status: 500,
  title: 'Мы уже фиксим',
  buttonText: 'Назад к чатам',
  action() {
    window.history.back();
  },
},
'#container');
