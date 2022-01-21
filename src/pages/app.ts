// Стили
import '../styles/components/sidebar/sidebar.scss';
import '../styles/components/container/container.scss';

// @ts-ignore
import avatarImage from '../../static/avatar.jpg';
import App from '../components/app';
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
import HeaderSettingsButton from '../components/headerSettingsButton/headerSettingsButton';
import Input from '../components/input/input';
import User from '../connectors/User';
import AddChatForm from '../components/addChatForm';
import ChatsAPI from '../connectors/ChatsAPI';
import DeleteUserForm from '../components/deleteUserForm';
import ChatMessage from '../components/chatMessage';
import ChatReply from '../components/chatReply';
import Main from '../components/main';
import beautifyTime from '../utils/beautifyTime';
import OpenSettingsButton from '../components/openSettingsButton';

const chatsAPI = new ChatsAPI(); // Экземпляр апи чатов

// Стейт приложения
const state = new State();

// Роутер
const router = new Router();

// Текущий чат будем хранить здесь
let currentChat: Chat;

// Будем получать список чатов из стейта
const chatsState = state.get('chats');
let chatsList;

// Проверка на наличие стейта
if (!chatsState) {
  chatsList = [];
} else {
  chatsList = chatsState.chatsList;
}

// Фабрика списка чатов
function getChatsList(chatsData: [Record<string, any>]) {
  // Пересобираем объект чатов так, чтобы он был заполнен данными
  const processedChats = chatsData.map((chat: Record<string, any>) => {
    if (!chat.avatar) {
      chat.avatar = avatarImage;
    }

    if (chat.last_message) {
      const { content } = chat.last_message;

      const regExp = /(<|&lt;)/gim;
      chat.last_message.content = content.replaceAll(regExp, '!!!');
    }

    return chat;
  });

  // Конструктор чата
  function chatConstructor(chatData: Record<string, any>): Chat {
    const chat = new Chat({
      ...chatData,
      events: {
        click() {
          // Записываем текущий чат в локальную переменную (для корректного размонтирования)
          currentChat = chat;
          document.querySelectorAll('.chat').forEach((item) => {
            item.classList.remove('chat_state_current');
          });

          chat.makeActive();
          // Скрыли меню если оно было открыто
          headerMenu.hide();
          headerMenuVisible = false;
          headerSettingsButton.show();

          state.set('header', {
            title: chatData.title,
          });

          // Записали в стейт текущий список сообщений
          state.set('messages', { messagesList: chat.getMessagesList() });
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

const openSettingsButton = new OpenSettingsButton({
  buttonText: 'Настройки',
  events: {
    click: () => {
      router.go('/settings');
    },
  },
});

const search = new Search({
  openSettingsButton,
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
// FIXME: Не показывать кнопку удаления в чате, где мы не владельцы
const deleteChatButton = new MenuButton({
  iconType: 'delete',
  buttonText: 'Удалить чат',
  events: {
    click() {
      headerMenu.hide();
      const currentChatId = state.get('currentChat').id;

      if (currentChatId) {
        chatsAPI.deleteChat({ chatId: currentChatId })
          .then((apiResponse: XMLHttpRequest) => {
            if (apiResponse.status === 200) {
              return JSON.parse(apiResponse.responseText);
            }

            throw new Error('Ошибка удаления чата');
          })
          .then(() => {
            // Размонтируем чат
            currentChat.hide();
            currentChat.destroy();

            return chatsAPI.getChats().then((chatsListResponse: XMLHttpRequest) => {
              if (chatsListResponse.status === 200) {
                return JSON.parse(chatsListResponse.responseText);
              }

              throw new Error('Ошибка удаления чата');
            });
          }).then((chatsData: Record<string, any>) => {
            // Записали обновленный список чатов
            state.set('chats', { list: chatsData });

            // Очистили состояние шапки чатов
            headerSettingsButton.hide();

            // Удалили заголовок чата
            state.set('header', {
              title: '',
            });

            // Очистить список сообщений
            state.set('messages', { messagesList: [] });

            state.delete(`chat-${currentChatId}`);
          })
          .catch((error) => {
            // Отловленную ошибку просто выведем в консоль
            console.log(error);
          });
      }
    },
  },
});

// Кнопка удаления пользователя
const deleteUserButton = new MenuButton({
  iconType: 'delete-user',
  buttonText: 'Удалить пользователя',
  events: {
    click() {
      removeUserPopup.show();
      headerMenu.hide();
    },
  },
});

// Кнопка добавления юзера в чат
const addUserButton = new MenuButton({
  iconType: 'add-user',
  buttonText: 'Добавить пользователя',
  events: {
    click() {
      addUserPopup.show();
      headerMenu.hide();
    },
  },
});

// Меню в шапке сайта
const headerMenu = new HeaderMenu({
  addUserButton,
  deleteUserButton,
  deleteChatButton,
  headerMenuFilesButton,
});

let headerMenuVisible = false;

const headerSettingsButton = new HeaderSettingsButton({
  text: 'Открыть меню настроек',
  events: {
    click() {
      if (headerMenuVisible) {
        headerMenu.hide();
        headerMenuVisible = false;
      } else {
        headerMenu.show();
        headerMenuVisible = true;
      }
    },
  },
});

const header = new Header({
  title: '',
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
  buttonText: 'Добавить пользователя',
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
        const user = new User();
        user.findUserByLogin(formData).then((apiResponce: XMLHttpRequest) => {
          if (apiResponce.status === 200) {
            // Если данные пришли, мы должны проверить, найден ли юзер
            return JSON.parse(apiResponce.responseText);
          }
          // Показываем ошибку
          throw new Error('Ошибка добавления пользователя');
        }).then((usersList) => {
          if (usersList.length > 0) {
            // eslint-disable-next-line max-len
            const filteredUsersList = usersList.filter((item: Record<string, any>) => item.login === formData.login);
            const currentChatID = state.get('currentChat').id;

            // Добавляем юзера только с точным совпадением
            if (filteredUsersList.length === 1) {
              // Добавляем в текущий чат найденного юзера
              return chatsAPI.addUsersToChat({
                users: [filteredUsersList[0].id],
                chatId: currentChatID,
              }).then((response: XMLHttpRequest) => {
                if (response.status === 200) {
                  return chatsAPI.getChatUsersList(currentChatID)
                    .then((chatUsersList: XMLHttpRequest) => JSON.parse(chatUsersList.responseText))
                    .then((users) => {
                      addUserPopup.hide();
                      // Обновили список пользователей в чате
                      state.set(`chat-${currentChatID}`, { users });
                    }).catch(() => {
                      throw new Error('Ошибка получения списка юзеров после добавления юзера в чат');
                    });
                }

                throw new Error('Ошибка при добавлении пользователя в чат (найден, но не добавлен)');
              });
            }
            throw new Error('Пользователь с таким именем не найден');
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

const userNameInputToDelete = new Input({
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

const deleteUserForm = new DeleteUserForm({
  title: 'Удалить пользователя из чата',
  buttonText: 'Удалить пользователя',
  userNameInput: userNameInputToDelete,
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
      state.set('deleteUserForm', { error: '' });

      const formData = form.collectData();

      chatsAPI.getChatUsersList(currentChat.getID())
        .then((usersList: XMLHttpRequest) => JSON.parse(usersList.responseText))
        .then((chatUsers) => {
          // Если в чате больше 1 юзера
          if (chatUsers.length > 1) {
            const usersToDelete = chatUsers.filter((user: any) => user.login === formData.login);
            const currentChatID = state.get('currentChat').id;

            if (usersToDelete.length === 1) {
              return chatsAPI.deleteUserFromChat({
                users: [usersToDelete[0].id],
                chatId: currentChatID,
              }).then((result: XMLHttpRequest) => {
                if (result.status === 200) {
                  return chatsAPI.getChatUsersList(currentChatID)
                    .then((chatUsersList: XMLHttpRequest) => JSON.parse(chatUsersList.responseText))
                    .then((users) => {
                      removeUserPopup.hide();
                      // Обновили список пользователей в чате
                      state.set(`chat-${currentChatID}`, { users });
                    }).catch(() => {
                      throw new Error('Ошибка получения списка пользователей после удаления пользователя из чата');
                    });
                }
                throw new Error('Ошибка удаления пользователя');
              });
            }
            throw new Error('Такого пользователя в чате нет');
          }
        }).catch((error) => {
          console.log(error);
          state.set('deleteUserForm', { error });
        });
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

const removeUserPopup = new PopUp({
  children: deleteUserForm,
  events: {
    click(event: any) {
      event.stopPropagation();

      if (event.target.classList.contains('popup__close') || event.target.className === 'popup') {
        removeUserPopup.hide();
      }
    },
  },
});

const addUserPopup = new PopUp({
  children: addUserForm,
  events: {
    click(event: any) {
      event.stopPropagation();

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

const messagesListConstructor = (messagesArray: [Record<string, any>]): Array<ChatMessage | ChatReply | never> => {
  // Если текущего чата нет, или нет текущего юзера, вернем пустой массив
  if (!(state.get('currentChat') && state.get('settings'))) {
    return [];
  }

  // Если юзер и настройки есть, сгенерируем список чатов
  const { id: currentChatId } = state.get('currentChat');
  const { id: currentUserId, avatar } = state.get('settings');
  const { users } = state.get(`chat-${currentChatId}`);

  // Формируем массив сообщений чата
  return messagesArray.map((item: any) => {
    // eslint-disable-next-line camelcase,prefer-const
    let { user_id, time, content } = item;

    // Сделаем тупую реализацию защиты от XSS чтобы что-то была какая-то защита
    const regExp = /(<|&lt;)/gim;
    content = content.replaceAll(regExp, '!!!');

    // Автор сообщений текущий юзер?
    if (item.user_id === currentUserId) {
      //  1) Да
      return new ChatReply({
        avatar,
        content,
        time: beautifyTime(time),
      });
    }

    // eslint-disable-next-line camelcase
    const messageAuthor = users.filter((user: Record<string, any>) => user.id === user_id);

    const userAvatarFile = messageAuthor[0].avatar;

    // Здесь будем хранить урл аватара
    let userAvatar = '';

    // Если аватар еще не установлен, заменим на дефолтный аватар
    if (!userAvatarFile) {
      userAvatar = avatarImage;
    } else {
      userAvatar = `https://ya-praktikum.tech/api/v2/resources${userAvatarFile}`;
    }

    // eslint-disable-next-line max-len
    const nickName = messageAuthor[0].display_name ? messageAuthor[0].display_name : messageAuthor[0].first_name;

    //  1) Если не является - message
    return new ChatMessage({
      avatar: userAvatar,
      content,
      time: beautifyTime(time),
      nickName,
    });
  });
};

const messages = new Messages({
  avatarImage, // Аватар по умолчанию
  messagesListConstructor, // Конструктор списка сообщений
  messagesList: [], // Список сообщений (по дефолту - пуст)
});

const messageForm = new MessageForm({
  events: {
    submit(event: { preventDefault: () => void; target: { message: any; }; }) {
      event.preventDefault();
      if (event) {
        const chatMessage = event.target.message.value;
        // Если текущий чат выбран, отправляем сообщение
        if (currentChat) {
          // Сделаем тупую реализацию защиты от XSS чтобы что-то была какая-то защита
          const regExp = /(<|&lt;)/gim;
          const message = chatMessage.replaceAll(regExp, '!!!');
          currentChat.sendMessage(`${message}`);
          event.target.message.value = '';
        } else {
          console.log('Чат не выбран');
        }
      }
    },
  },
});

const main = new Main({
  header,
  messages,
  messageForm,
});

export default new App({
  search,
  chats,
  controls,
  main,
  addUserPopup,
  addChatPopup,
  removeUserPopup,
});
