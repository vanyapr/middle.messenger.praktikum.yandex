import App from '../components/app';

import '../styles/components/sidebar/sidebar.scss';
import '../styles/components/main/main.scss';

// @ts-ignore
import avatar from '../../static/avatar.jpg';
import Chats from '../components/chats/chats';
import Search from '../components/search/search';
import Header from '../components/header/header';
import Controls from '../components/controls/controls';
import Inputs from '../components/inputs/inputs';
import Messages from '../components/messages/messages';
// import collectFormData from '../utils/collectFormData/collectFormData';
import { notEmptyValidator, loginValidator } from '../settings/validators';
import MenuButton from '../components/menuButton';
import HeaderMenu from '../components/headerMenu/headerMenu';
import Router from '../utils/Router/Router';
import PopUp from '../components/popUp';
import AddUserForm from '../components/addUserForm';
import validateInput from '../utils/validateInput/validateInput';
import Form from '../utils/Form/Form';
const router = new Router();

const chats = new Chats({
  avatar,
});

const search = new Search();

// Кнопка настроек
const headerMenuSettingsButton = new MenuButton({
  iconType: 'settings',
  buttonText: 'Настройки',
  clickAction: () => {
    console.log('Настройки');
    router.go('/settings');
  },
});

// Кнопка "показать вложения"
const headerMenuFilesButton = new MenuButton({
  iconType: 'attachments',
  buttonText: 'Вложения',
  clickAction: () => {
    console.log('Вложения');
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
  buttonClick() {
    headerMenu.toggle();
  },
});

const addUserForm = new AddUserForm({
  title: 'Добавить контакт',
  buttonText: 'Добавить в контакты',
  loginValidator,
  handleSubmit(event: Event) {
    event.preventDefault();

    // Собираем данные формы
    const form = new Form(
      this,
      'input_state_valid',
      'input_state_invalid',
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
});

const popup = new PopUp({
  children: addUserForm,
  closePopup(event: Event) {
    event.stopPropagation();

    // @ts-ignore
    if (event.target && event.target.classList.contains('close')) {
      popup.toggle();
    }
  },
});

const controls = new Controls({
  handleClick() {
    console.log('Нажата кнопка закрытия');
    popup.toggle();
  },
});

const inputs = new Inputs();

const messages = new Messages({
  avatar,
});

export default new App({
  avatar,
  search,
  chats,
  controls,
  header,
  messages,
  inputs,
  popup,
  notEmptyValidator,
  handleSubmit(event: Event) {
    event.preventDefault();
    // Передали форму для сбора данных
    console.log('Отправка сообщения');
  },
},
'#container');
