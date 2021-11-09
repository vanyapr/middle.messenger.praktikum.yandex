import '../styles/components/button/button.scss';

// Темплейт
import BackButton from '../components/backButton';
import EditPassword from '../components/editPassword';

// Импорт картинок
// @ts-ignore
import image from '../../static/avatar.jpg';

import collectFormData from '../utils/collectFormData/collectFormData';
import { passwordValidator } from '../settings/validators';
import validateInput from '../utils/validateInput/validateInput';
import Container from '../components/container/container';
import Router from '../utils/Router/Router';
const router = new Router();

const backButton = new BackButton({
  buttonText: 'Вернуться назад',
  back() {
    router.back();
  },
});

const editPassword = new EditPassword({
  name: 'Иван',
  avatar: image,
  back() {
    router.back();
  },
  handleSubmit(event: Event) {
    event.preventDefault();
    // Передали форму в обработчик
    collectFormData(this, 'settings__value_state_valid', 'settings__value_state_invalid');
  },
  passwordValidator,
  validate() {
    validateInput(this, 'settings__value_state_valid', 'settings__value_state_invalid');
  },
});

export default new Container({
  aside: backButton,
  main: editPassword,
}, '#container');
