import App from '../components/app';

import '../styles/components/sidebar/sidebar.scss';
import '../styles/components/main/main.scss';
import '../styles/components/container/container.scss';

// @ts-ignore
import avatar from '../../static/avatar.jpg';
import Chat from '../components/chat';
import Chats from '../components/chats/index';
import Search from '../components/search/search';
import Header from '../components/header/header';
import Controls from '../components/controls/controls';
import Messages from '../components/messages/messages';
import { loginValidator, notEmptyValidator } from '../settings/validators';
import MenuButton from '../components/menuButton';
import HeaderMenu from '../components/headerMenu/headerMenu';
import Router from '../utils/Router/Router';
import PopUp from '../components/popUp';
import AddUserForm from '../components/addUserForm';
import validateInput from '../utils/validateInput/validateInput';
import Form from '../utils/Form/Form';

import State from '../utils/State/State';
import MessageForm from '../components/messageForm/messageForm';

// Стейт приложения
const state = new State();

const router = new Router();

const chatsData = [
  {
    id: 123,
    title: 'my-chat',
    avatar,
    unread_count: 15,
    last_message: {
      user: {
        first_name: 'Petya',
        second_name: 'Pupkin',
        avatar,
        email: 'my@email.com',
        login: 'userLogin',
        phone: '8(911)-222-33-22',
      },
      time: '2020-01-02T14:22:22.000Z',
      content: 'this is message content',
    },
  },
  {
    id: 123,
    title: 'my-chat',
    avatar: '/123/avatar1.jpg',
    unread_count: 15,
    last_message: {
      user: {
        first_name: 'Vasya',
        second_name: 'Pupkin',
        avatar,
        email: 'my@email2.com',
        login: 'userLogins',
        phone: '8(911)-222-33-22',
      },
      time: '2020-01-02T14:22:22.000Z',
      content: 'Another message',
    },
  },
];

// TODO: рендер списка чатов
// Каждый чат со своими пропсами
// отображаем в контейнере чатов
// по смене пропсов выполняем повторный рендер списка чатов
// добавляя обновленный чат сверху и удаляя предыдущий
const chatData = chatsData[0];

const chat = new Chat({
  ...chatData,
  events: {
    handleMouseOver() {
      console.log('MouseOver');
      state.set('chat123', { unread_count: 42 });
    },
  },
});

const chats = new Chats({
  // avatar,
  chats: chat,
});

const search = new Search({

});

// Кнопка настроек
const headerMenuSettingsButton = new MenuButton({
  iconType: 'settings',
  buttonText: 'Настройки',
  events: {
    clickAction: () => {
      console.log('Настройки');
      router.go('/settings');
    },
  },
});

// Кнопка "показать вложения"
const headerMenuFilesButton = new MenuButton({
  iconType: 'attachments',
  buttonText: 'Вложения',
  events: {
    clickAction: () => {
      console.log('Вложения');
    },
  },
});

// Меню в шапке сайта
const headerMenu = new HeaderMenu({
  headerMenuSettingsButton,
  headerMenuFilesButton,
});

const header = new Header({
  title: 'Заголовок чата будет здесь!',
  menu: headerMenu,
  events: {
    buttonClick() {
      headerMenu.toggle();
    },
  },
});

const addUserForm = new AddUserForm({
  title: 'Добавить контакт',
  buttonText: 'Добавить в контакты',
  loginValidator,
  events: {
    handleSubmit(event: Event) {
      event.preventDefault();

      // Собираем данные формы
      const form = new Form(
        this,
        'button',
      );

      const formData = form.collectData();

      if (formData) {
        console.log(formData);
      } else {
        console.log('Форма невалидна и данных нет');
      }
    },
    validate() {
      validateInput(this, 'input_state_valid', 'input_state_invalid', '.button');
    },
  },
});

const popup = new PopUp({
  children: addUserForm,
  events: {
    closePopup(event: Event) {
      event.stopPropagation();

      // @ts-ignore
      if (event.target && event.target.classList.contains('close')) {
        popup.toggle();
      }
    },
  },

});

const controls = new Controls({
  events: {
    handleClick() {
      console.log('Нажата кнопка закрытия');
      popup.toggle();
    },
  },

});

const messages = new Messages({
  avatar,
});

const messageForm = new MessageForm({});

export default new App({
  // avatar,
  search,
  chats,
  controls,
  header,
  messages,
  messageForm,
  popup,
  // notEmptyValidator,
  events: {
    handleSubmit(event: Event) {
      event.preventDefault();
      // Передали форму для сбора данных
      console.log('Отправка сообщения');
    },
  },

});
