import '../styles/components/button/button.scss';

// Темплейт
import BackButton from '../components/backButton';
import EditPassword from '../components/editPassword';

// Импорт картинок
// @ts-ignore
import image from '../../static/avatar.jpg';

import { passwordValidator } from '../settings/validators';
import validateInput from '../utils/validateInput/validateInput';
import Container from '../components/container/container';
import Router from '../utils/Router/Router';
import Form from '../utils/Form/Form';
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

    // Собираем данные формы
    const form = new Form(
      this,
      'settings__value_state_valid',
      'settings__value_state_invalid',
      '.button',
    );

    const formData = form.collectData();

    if (formData) {
      console.log(formData);
    } else {
      console.log('Форма невалидна и данных нет');
    }
  },
  passwordValidator,
  validate() {
    validateInput(this, 'settings__value_state_valid', 'settings__value_state_invalid', '.button');
  },
});

export default new Container({
  aside: backButton,
  main: editPassword,
}, '#container');
