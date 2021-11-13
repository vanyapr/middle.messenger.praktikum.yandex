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
import State from '../utils/State/State';

const router = new Router();
const state = new State();
const settings = state.get('settings');

const backButton = new BackButton({
  buttonText: 'Вернуться назад',
  back() {
    router.back();
  },
});

const editPassword = new EditPassword({
  ...settings,
  // FIXME: Исправить проблему с отображением ошибки
  error: '',
  back() {
    router.back();
  },
  handleSubmit(event: Event) {
    event.preventDefault();

    state.set('password', { error: 'Пароли не совпадают' });
    // Собираем данные формы
    const form = new Form(
      this,
      'settings__value_state_valid',
      'settings__value_state_invalid',
      '.button',
    );

    const formData = form.collectData();

    // 123ASDaas
    if (formData) {
      console.log(formData);
      // Проверим равны ли новые пароли
      if (formData.newPassword === formData.newPassword2) {
        // Делаем запрос
        console.log('Делаем запрос');
      } else {
        console.log('Пароли не совпали');
        state.set('password', { error: 'Пароли не совпадают' });
      }
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
