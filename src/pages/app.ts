import App from '../components/app';

// Стили
import '../styles/components/sidebar/sidebar.scss';
import '../styles/components/main/main.scss';
import '../styles/components/container/container.scss';
import '../styles/components/chat-menu/chat-menu.scss';

// @ts-ignore
import avatar from '../../static/avatar.jpg';
import Chat from '../components/chat';
import Chats from '../components/chats/index';
import Search from '../components/search/search';
import Header from '../components/header/header';
import Controls from '../components/controls/controls';
import Messages from '../components/messages/messages';
import { loginValidator, notEmptyValidator, passwordValidator } from '../settings/validators';
import MenuButton from '../components/menuButton';
import HeaderMenu from '../components/headerMenu/headerMenu';
import Router from '../utils/Router/Router';
import PopUp from '../components/popUp';
import AddUserForm from '../components/addUserForm';
import validateInput from '../utils/validateInput/validateInput';
import Form from '../utils/Form/Form';
import State from '../utils/State/State';
import MessageForm from '../components/messageForm/messageForm';
import HeaderSettingsButton from '../components/headerSettingsButton/headerSettingsButton';
import DeleteChatMenu from '../styles/components/deleteChatMenu/deleteChatMenu';
import Input from '../components/input/input';
import User from '../connectors/User';
import AddChatForm from '../components/addChatForm';

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
    id: 321,
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
const chatDataForConstructor = chatsData[0];

// ID текущего чата просто будем хранить тут
const currentChatId: any = undefined;

// TODO: Конструктор чата
function chatConstructor(chatData: Record<string, any>): Chat {
  const deleteChatButton = new MenuButton({
    iconType: 'delete',
    buttonText: 'Удалить чат',
    events: {
      click() {
        console.log(`Удаляем чат ${chatData.id}`);
      },
    },
  });

  const deleteUserButton = new MenuButton({
    iconType: 'delete-user',
    buttonText: 'Удалить пользователя',
    events: {
      click() {
        console.log(`Удаляем юзера из чата ${chatData.id}`);
      },
    },
  });

  const addUserButton = new MenuButton({
    iconType: 'add-user',
    buttonText: 'Добавить пользователя',
    events: {
      click() {
        console.log(`Добавляем юзера в чат ${chatData.id}`);
      },
    },
  });

  const deleteChatMenu = new DeleteChatMenu({
    addUser: addUserButton,
    deleteUser: deleteUserButton,
    deleteChat: deleteChatButton,
  });

  return new Chat({
    ...chatData,
    deleteMenu: deleteChatMenu,
    events: {
      click(event: any) {
        if (event.target.className === 'chat__edit') {
          deleteChatMenu.toggle();
        }
      },
    },
  });
}

const chat = chatConstructor(chatDataForConstructor);

const chats = new Chats({
  // avatar,
  chats: chat,
});

const search = new Search({

});

// Кнопка настроек в меню
const headerMenuSettingsButton = new MenuButton({
  iconType: 'settings',
  buttonText: 'Настройки',
  events: {
    click: () => {
      router.go('/settings');
    },
  },
});

// Кнопка "показать вложения"
const headerMenuFilesButton = new MenuButton({
  iconType: 'attachments',
  buttonText: 'Вложения',
  events: {
    click: () => {
      console.log('Вложения');
    },
  },
});

// Меню в шапке сайта
const headerMenu = new HeaderMenu({
  headerMenuSettingsButton,
  headerMenuFilesButton,
});

const headerSettingsButton = new HeaderSettingsButton({
  text: 'Открыть меню настроек',
  events: {
    click() {
      if (state.get('headerSettingsButton').pressed) {
        headerMenu.hide();
        state.set('headerSettingsButton', { pressed: false });
      } else {
        headerMenu.show();
        state.set('headerSettingsButton', { pressed: true });
      }
    },
  },
});

const header = new Header({
  title: 'Заголовок чата будет здесь!',
  button: headerSettingsButton,
  menu: headerMenu,
});

const userNameInput = new Input({
  name: 'login',
  type: 'text',
  textName: 'Имя пользователя',
  errorText: '',
  value: '',
  events: {
    keyup() {
      const input = this.querySelector('.input');
      const error = this.querySelector('.form__error');
      const validity = validateInput(input, loginValidator, 'input_state_valid', 'input_state_invalid');

      if (!validity) {
        error.textContent = 'Минимум 4 знака: буквы, цифры или символы \'-\' и \'_\'';
      }
    },
  },
});

const addUserForm = new AddUserForm({
  title: 'Добавить пользователя в чат',
  buttonText: 'Добавить в пользователя',
  userNameInput,
  error: '',
  events: {
    submit(event: Event) {
      event.preventDefault();

      // Собираем данные формы
      const form = new Form(
        this,
        'button',
      );

      // Обнулили ошибку (если она до этого была)
      state.set('addUserForm', { error: '' });

      const formData: any = form.collectData();

      if (formData) {
        console.log(formData);
        // TODO:
        //  1) Ищем юзера с таким именем
        //    а) Юзер не найден, ошибка
        //    б) Юзер найден, тогда
        //  2) Получить айди текущего чата?
        //  3) Добавляем юзера в чат
        const user = new User();
        user.findUserByLogin(formData).then((apiResponce: XMLHttpRequest) => {
          console.log(apiResponce);
          if (apiResponce.status === 200) {
            // Если данные пришли, мы должны проверить, найден ли юзер
            return JSON.parse(apiResponce.responseText);
          }
          // Показываем ошибку
          throw new Error('Ошибка добавления пользователя');
        }).then((usersList) => {
          if (usersList.length > 0) {
            console.log('Список юзеров');
            console.log(usersList);
            // Выбираем юзера только с точным совпадением
          } else {
            throw new Error('Пользователь с таким именем не найден');
          }
        }).catch((error) => {
          console.log('Ошибка поиска юзера');
          // Записали ошибку в стейт
          state.set('addUserForm', { error });
        });
      } else {
        console.log('Форма невалидна и данных нет');
      }
    },
  },
});

const chatNameInput = new Input({
  name: 'title',
  type: 'text',
  textName: 'Название чата',
  errorText: '',
  value: '',
  events: {
    keyup() {
      const input = this.querySelector('.input');
      const error = this.querySelector('.form__error');
      const validity = validateInput(input, loginValidator, 'input_state_valid', 'input_state_invalid');

      if (!validity) {
        error.textContent = 'Минимум 4 знака: буквы, цифры или символы \'-\' и \'_\'';
      }
    },
  },
});

const addChatForm = new AddChatForm({
  title: 'Создать чат',
  buttonText: 'Создать',
  chatNameInput,
  error: '',
  events: {
    submit(event: Event) {
      event.preventDefault();
      console.log('Добавлен чат такой-то');

      // Собираем данные формы
      const form = new Form(
        this,
        'button',
      );

      // Обнулили ошибку (если она до этого была)
      state.set('addChatForm', { error: '' });

      const formData: any = form.collectData();

      if (formData) {
        console.log(formData);
      }
    },
  },
});

const addUserPopup = new PopUp({
  children: addUserForm,
  events: {
    click(event: any) {
      event.stopPropagation();
      console.log('Нажата кнопка закрытия');

      if (event.target.classList.contains('popup__close') || event.target.className === 'popup') {
        addUserPopup.hide();
      }
    },
  },
});

const addChatPopup = new PopUp({
  children: addChatForm,
  events: {
    click(event: any) {
      event.stopPropagation();
      console.log('Нажата кнопка закрытия');

      if (event.target.classList.contains('popup__close') || event.target.className === 'popup') {
        addChatPopup.hide();
      }
    },
  },
});

const controls = new Controls({
  events: {
    click() {
      addChatPopup.show();
    },
  },
});

const messages = new Messages({
  avatar,
});

const messageForm = new MessageForm({
  events: {
    submit(event: { preventDefault: () => void; target: { message: any; }; }) {
      event.preventDefault();
      if (event) {
        const { message } = event.target;
        // Текст сообщения
        console.log(message.value);
      }
    },
  },
});

export default new App({
  search,
  chats,
  controls,
  header,
  messages,
  messageForm,
  addUserPopup,
  addChatPopup,
  events: {
    handleSubmit(event: Event) {
      event.preventDefault();
      // Передали форму для сбора данных
      console.log('Отправка сообщения');
    },
  },

});
