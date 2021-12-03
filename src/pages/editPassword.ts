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
import User from '../connectors/User';

const router = new Router();
const state = new State();
const settings = state.get('settings');

const backButton = new BackButton({
  buttonText: 'Вернуться назад',
  events: {
    click() {
      router.back();
    },
  },
});

const editPassword = new EditPassword({
  ...settings,
  error: '',
  events: {
    back() {
      router.back();
    },
    handleSubmit(event: Event) {
      event.preventDefault();

      // Собираем данные формы
      const form = new Form(
        this,
        '.button',
      );

      const formData = form.collectData();

      // adrf43gdA
      if (formData) {
        form.disableButton();
        // Проверим равны ли новые пароли
        if (formData.newPassword === formData.newPassword2) {
          const { oldPassword, newPassword } = formData;
          const passwords = { oldPassword, newPassword };

          // Делаем запрос
          const user = new User();
          user.changePassword(passwords).then((response: XMLHttpRequest) => {
            if (response.status === 200) {
              state.set('settings', { error: '' });
              form.enableButton();
            } else {
              throw new Error(`${response.status}: ${response.statusText}`);
            }
          }).catch((error) => {
            form.enableButton();
            console.log(error);
            state.set('settings', { error: 'Ошибка изменения пароля' });
          });
        } else {
          console.log('Пароли не совпали');
          state.set('settings', { error: 'Пароли не совпадают' });
          form.enableButton();
        }
      } else {
        console.log('Форма невалидна и данных нет');
      }
    },
    validate() {
      validateInput(this, 'settings__value_state_valid', 'settings__value_state_invalid', '.button');
    },
  },

});

export default new Container({
  aside: backButton,
  main: editPassword,
});
