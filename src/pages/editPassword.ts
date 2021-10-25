// Стили по умолчанию
import '../styles/vendor/normalize.css';
import '../styles/vendor/fonts/Inter/inter.css';
import '../styles/components/root/root.scss';
import '../styles/components/container/container.scss';
import '../styles/components/button/button.scss';

// Темплейт
import BackButton from '../components/backButton';
import EditPassword from '../components/editPassword';

// Импорт картинок
// @ts-ignore
import image from '../../static/avatar.jpg';

// Передадим в пропс функцию обработчик сабмита формы
import collectFormData from '../utils/collectFormData/collectFormData';
import { passwordValidator } from '../settings/validators';
import validateInput from '../utils/validateInput/validateInput';

// @ts-ignore
const backButton = new BackButton({
  buttonText: 'Вернуться назад',
  back() {
    window.history.back();
  },
},

'#container');

// @ts-ignore
const editPassword = new EditPassword({
  name: 'Иван',
  avatar: image,
  back() {
    window.history.back();
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
},
'#container');
