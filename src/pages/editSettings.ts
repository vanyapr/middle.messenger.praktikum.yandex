// Стили по умолчанию
import '../styles/vendor/normalize.css';
import '../styles/vendor/fonts/Inter/inter.css';
import '../styles/components/root/root.scss';
import '../styles/components/container/container.scss';
import '../styles/components/button/button.scss';

// Темплейт
import BackButton from '../components/backButton';
import EditSettings from '../components/editSettings';

// Импорт картинок
// @ts-ignore
import image from '../../static/avatar.jpg';
import collectFormData from '../utils/collectFormData/collectFormData';
import validateInput from '../utils/validateInput/validateInput';
import {
  emailValidator,
  loginValidator,
  nameValidator,
  passwordValidator, phoneValidator,
} from '../settings/validators';

// @ts-ignore
const aside = new BackButton({
  buttonText: 'Вернуться назад',
  back() {
    console.log('test');
    window.history.back();
  },
},
'#container');

// @ts-ignore
const main = new EditSettings({
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
    window.history.back();
  },
}, '#container');
