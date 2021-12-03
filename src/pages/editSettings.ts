import BackButton from '../components/backButton';
import EditSettings from '../components/editSettings';
import User from '../connectors/User';
import validateInput from '../utils/validateInput/validateInput';
import Router from '../utils/Router/Router';
import {
  emailValidator,
  loginValidator,
  nameValidator,
  passwordValidator,
  phoneValidator,
} from '../settings/validators';
import Container from '../components/container/container';
import Form from '../utils/Form/Form';
import State from '../utils/State/State';
// @ts-ignore
import image from '../../static/avatar.jpg';

const router = new Router();

const backButton = new BackButton({
  buttonText: 'Вернуться назад',
  events: {
    click() {
      router.back();
    },
  },

});

const state = new State();
const settings = state.get('settings');

const editSettings = new EditSettings({
  ...settings,
  error: '',
  loginValidator,
  passwordValidator,
  nameValidator,
  emailValidator,
  phoneValidator,
  events: {
    handleSubmit(event: Event) {
      event.preventDefault();

      // Собираем данные формы
      const form = new Form(
        this,
        '.button',
      );

      const formData = form.collectData();

      if (formData) {
        form.disableButton();
        const user = new User();
        return user.saveProfile(formData).then((response: XMLHttpRequest) => {
          console.log(response);
          if (response.status === 200) {
            console.log();
            const newSettings = JSON.parse(response.responseText);

            if (!newSettings.avatar) {
              newSettings.avatar = image;
            }
            newSettings.error = '';
            state.set('settings', newSettings);
            form.enableButton();
          } else {
            state.set('settings', { error: 'Ошибка сохранения данных' });
          }
        }).catch((error: any) => {
          console.log(error);
          form.enableButton();
          router.go('/500');
        });
      }
      form.enableButton();
      console.log('Форма невалидна и данных нет');
    },
    validate() {
      validateInput(this, 'settings__value_state_valid', 'settings__value_state_invalid', '.button');
    },
    back() {
      router.back();
    },
  },

});

export default new Container({
  aside: backButton,
  main: editSettings,
});
