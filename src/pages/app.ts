import App from '../components/app';

// Стили
import '../styles/vendor/normalize.css';
import '../styles/vendor/fonts/Inter/inter.css';
import '../styles/components/root/root.scss';
import '../styles/components/container/container.scss';

import '../styles/components/sidebar/sidebar.scss';
import '../styles/components/main/main.scss';
import '../styles/components/button/button.scss';

// @ts-ignore
import avatar from '../../static/avatar.jpg';
import Chats from '../components/chats/chats';
import Search from '../components/search/search';
import Header from '../components/header/header';
import Controls from '../components/controls/controls';
import Inputs from '../components/inputs/inputs';
import Messages from '../components/messages/messages';

const chats = new Chats({
  avatar,
});

const search = new Search();

const header = new Header({
  title: 'Заголовок чата будет здесь!',
});

const controls = new Controls();

const inputs = new Inputs();

const messages = new Messages({
  avatar,
});

// Экстендим базовый класс
// @ts-ignore
const app = new App({
  avatar,
  search,
  chats,
  controls,
  header,
  messages,
  inputs,
},
'#container');
