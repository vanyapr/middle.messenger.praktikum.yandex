import app from '../templates/components/app';

// Стили
import '../styles/vendor/normalize.css';
import '../styles/vendor/fonts/Inter/inter.css';
import '../styles/components/root/root.scss';
import '../styles/components/container/container.scss';
import '../styles/components/sidebar/sidebar.scss';
import '../styles/components/search/search.scss';
import '../styles/components/controls/controls.scss';
import '../styles/components/main/main.scss';
import '../styles/components/header/header.scss';
import '../styles/components/inputs/inputs.scss';
import '../styles/components/button/button.scss';
import '../styles/components/messages/messages.scss';
import '../styles/components/message/message.scss';
import '../styles/components/reply/reply.scss';
import '../styles/components/chats/chats.scss';
import '../styles/components/chat/chat.scss';

// @ts-ignore
import avatar from '../../static/avatar.jpg';

// Движок рендера
import render from '../utils/render';

render(
  app,
  {
    avatar,
  },
  '#container',
);
