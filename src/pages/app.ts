// Стили
import '../styles/components/sidebar/sidebar.scss';
import '../styles/components/main/main.scss';
import '../styles/components/container/container.scss';
import '../styles/components/chat-menu/chat-menu.scss';

// @ts-ignore
import { response } from 'express';
import avatar from '../../static/avatar.jpg';
import App from '../components/app';
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
import Input from '../components/input/input';
import User from '../connectors/User';
import AddChatForm from '../components/addChatForm';
import ChatsAPI from '../connectors/ChatsAPI';

// Стейт приложения
const state = new State();

const router = new Router();

// FIXME: ID текущего чата пока что будем хранить тут
let currentChatId: any;

const chatsState = state.get('chats');
let chatsList;

// Проверка на наличие стейта
if (!chatsState) {
  chatsList = [];
} else {
  chatsList = chatsState.list;
}

// Фабрика списка чатов
function getChatsList(chatsData: [Record<string, any>]) {
  console.log('Вызван конструктор списка чатов');

  // Пересобираем объект чатов так, чтобы он был заполнен данными
  const processedChats = chatsData.map((chat: Record<string, any>) => {
    if (!chat.avatar) {
      chat.avatar = avatar;
    }

    return chat;
  });

  // Конструктор чата
  function chatConstructor(chatData: Record<string, any>): Chat {
    const chat = new Chat({
      ...chatData,
      events: {
        click(event: any) {
          console.log(`Нажали на чат ${chatData.id}`);
          currentChatId = chatData.id;
          document.querySelectorAll('.chat').forEach((item) => {
            item.classList.remove('chat_state_current');
          });
          chat.makeActive();
        },
      },
    });

    return chat;
  }

  return processedChats.map((chatItem: Record<string, any>) => chatConstructor(chatItem));
}

const chats = new Chats({
  list: chatsList,
  getChatsList,
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

// Кнопка удаления чата
const deleteChatButton = new MenuButton({
  iconType: 'delete',
  buttonText: 'Удалить чат',
  events: {
    click() {
      console.log(`Удаляем чат ${currentChatId}`);
      // const chatsAPI = new ChatsAPI();
      //
      // if (currentChatId) {
      //   chatsAPI.deleteChat({ chatId: currentChatId })
      //     .then(() => {
      //       console.log('Удален');
      //     });
      // }
    },
  },
});

// Кнопка удаления пользователя
const deleteUserButton = new MenuButton({
  iconType: 'delete-user',
  buttonText: 'Удалить пользователя',
  events: {
    click() {
      console.log(`Удаляем юзера из чата ${currentChatId}`);
    },
  },
});

// Кнопка добавления юзера в чат
const addUserButton = new MenuButton({
  iconType: 'add-user',
  buttonText: 'Добавить пользователя',
  events: {
    click() {
      console.log(`Добавляем юзера в чат ${currentChatId}`);
      addUserPopup.show();
    },
  },
});

// Меню в шапке сайта
const headerMenu = new HeaderMenu({
  addUserButton,
  deleteUserButton,
  deleteChatButton,
  headerMenuFilesButton,
  headerMenuSettingsButton,
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
      const validity = validateInput(input, notEmptyValidator, 'input_state_valid', 'input_state_invalid');

      if (!validity) {
        error.textContent = 'Название не может быть пустым';
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

      // Собираем данные формы
      const form = new Form(
        this,
        'button',
      );

      const formData: any = form.collectData();

      if (formData) {
        const chatsAPI = new ChatsAPI();
        chatsAPI.createChat(formData).then((chatCreationResult: XMLHttpRequest) => {
          if (chatCreationResult.status === 200) {
            return;
          }

          throw new Error('Ошибка создания чата');
        }).then(() => chatsAPI.getChats().then((chatsListRequest: XMLHttpRequest) => {
          if (chatsListRequest.status === 200) {
            return JSON.parse(chatsListRequest.responseText);
          }

          throw new Error('Ошибка при получении списка чатов');
        }).then((chatsArray) => {
          // Закрыли попап
          addChatPopup.hide();
          // Обновили список чатов
          state.set('chats', { list: chatsArray });
          // Обнулили ошибку (если она до этого была)
          state.set('addChatForm', { error: '' });
        })).catch((error) => {
          state.set('addChatForm', { error: 'Ошибка создания чата' });
          console.log(error);
        });
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
