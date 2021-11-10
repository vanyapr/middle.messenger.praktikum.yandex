import '../styles/components/button/button.scss';

// Темплейт
import BackButton from '../components/backButton';
import EditSettings from '../components/editSettings';

// Импорт картинок
// @ts-ignore
import image from '../../static/avatar.jpg';
import validateInput from '../utils/validateInput/validateInput';
import Router from '../utils/Router/Router';
import {
  emailValidator,
  loginValidator,
  nameValidator,
  passwordValidator, phoneValidator,
} from '../settings/validators';
import Container from '../components/container/container';
import Form from '../utils/Form/Form';
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
  validate() {
    validateInput(this, 'settings__value_state_valid', 'settings__value_state_invalid', '.button');
  },
  back() {
    router.back();
  },
});

export default new Container({
  aside: backButton,
  main: editSettings,
}, '#container');
