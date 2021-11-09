import '../styles/components/button/button.scss';

// Темплейт
import BackButton from '../components/backButton';
import EditSettings from '../components/editSettings';

// Импорт картинок
// @ts-ignore
import image from '../../static/avatar.jpg';
import collectFormData from '../utils/collectFormData/collectFormData';
import validateInput from '../utils/validateInput/validateInput';
import Router from '../utils/Router/Router';
import {
  emailValidator,
  loginValidator,
  nameValidator,
  passwordValidator, phoneValidator,
} from '../settings/validators';
import Container from '../components/container/container';
const router = new Router();

const backButton = new BackButton({
  buttonText: 'Вернуться назад',
  back() {
    router.back();
  },
});

const editSettings = new EditSettings({
  name: 'Иван',
  avatar: image,
  loginValidator,
  passwordValidator,
  nameValidator,
  emailValidator,
  phoneValidator,
  handleSubmit(event: Event) {
    event.preventDefault();
    // Передали форму для сбора данных
    collectFormData(this, 'settings__value_state_valid', 'settings__value_state_invalid');
  },
  validate() {
    validateInput(this, 'settings__value_state_valid', 'settings__value_state_invalid');
  },
  back() {
    router.back();
  },
});

export default new Container({
  aside: backButton,
  main: editSettings,
}, '#container');
