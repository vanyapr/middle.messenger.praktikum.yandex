import SignUpForm from '../components/signUpForm';
import Router from '../utils/Router/Router';
import validateInput from '../utils/validateInput/validateInput';
import Form from '../utils/Form/Form';
import Auth from '../connectors/Auth';
import State from '../utils/State/State';
import Input from '../components/input/input';
import {
  emailValidator,
  loginValidator,
  nameValidator,
  passwordValidator,
  phoneValidator,
} from '../settings/validators';
import Link from '../components/link/link';

// Объявили роутер
const router = new Router();

// Стейт приложения
const state = new State();

// Будем хранить состояние формы локально
const formState: Record<string, boolean> = {};

const loginInput = new Input({
  name: 'login',
  type: 'text',
  textName: 'Имя пользователя',
  errorText: '',
  value: '',
  events: {
    keyup() {
      const input = this.querySelector('.input');
      const error = this.querySelector('.form__error');
      const validity = validateInput(input, loginValidator, 'input_state_valid', 'input_state_invalid');

      if (!validity) {
        error.textContent = 'Минимум 4 знака: буквы, цифры или символы \'-\' и \'_\'';
        formState.loginIsValid = false;
      } else {
        formState.loginIsValid = true;
      }
    },
  },
});

const emailInput = new Input({
  name: 'email',
  type: 'email',
  textName: 'Адрес электронной почты',
  errorText: '',
  value: '',
  events: {
    keyup() {
      const input = this.querySelector('.input');
      const error = this.querySelector('.form__error');
      const validity = validateInput(input, emailValidator, 'input_state_valid', 'input_state_invalid');

      if (!validity) {
        error.textContent = 'Введите корректный адрес электронной почты';
        formState.emailIsValid = false;
      } else {
        formState.emailIsValid = true;
      }
    },
  },
});

const firstNameInput = new Input({
  name: 'first_name',
  type: 'text',
  textName: 'Ваше имя',
  errorText: '',
  value: '',
  events: {
    keyup() {
      const input = this.querySelector('.input');
      const error = this.querySelector('.form__error');
      const validity = validateInput(input, nameValidator, 'input_state_valid', 'input_state_invalid');

      if (!validity) {
        error.textContent = 'Введите имя с Заглавной буквы';
        formState.firstNameIsValid = false;
      } else {
        formState.firstNameIsValid = true;
      }
    },
  },
});

const lastNameInput = new Input({
  name: 'second_name',
  type: 'text',
  textName: 'Ваша фамилия',
  errorText: '',
  value: '',
  events: {
    keyup() {
      const input = this.querySelector('.input');
      const error = this.querySelector('.form__error');
      const validity = validateInput(input, nameValidator, 'input_state_valid', 'input_state_invalid');

      if (!validity) {
        error.textContent = 'Введите фамилию с Заглавной буквы';
        formState.secondNameIsValid = false;
      } else {
        formState.secondNameIsValid = true;
      }
    },
  },
});

const phoneInput = new Input({
  name: 'phone',
  type: 'text',
  textName: 'Номер телефона',
  errorText: '',
  value: '',
  events: {
    keyup() {
      const input = this.querySelector('.input');
      const error = this.querySelector('.form__error');
      const validity = validateInput(input, phoneValidator, 'input_state_valid', 'input_state_invalid');

      if (!validity) {
        error.textContent = 'Только цифры и знак +. Минимум 10 символов';
        formState.phoneIsValid = false;
      } else {
        formState.phoneIsValid = true;
      }
    },
  },
});

const passwordInput = new Input({
  name: 'password',
  type: 'password',
  textName: 'Пароль',
  errorText: '',
  value: '',
  events: {
    keyup() {
      const input = this.querySelector('.input');
      const error = this.querySelector('.form__error');
      const validity = validateInput(input, passwordValidator, 'input_state_valid', 'input_state_invalid');

      if (!validity) {
        error.textContent = 'Минимум 8 знаков. Обязательны ЗАГЛАВНАЯ буква и цифра';
        formState.password1IsValid = false;
      } else {
        formState.password1IsValid = true;
      }
    },
  },
});

const passwordInput2 = new Input({
  name: 'password2',
  type: 'password',
  textName: 'Пароль ещё раз',
  errorText: '',
  value: '',
  events: {
    keyup() {
      const input = this.querySelector('.input');
      const error = this.querySelector('.form__error');
      const validity = validateInput(input, passwordValidator, 'input_state_valid', 'input_state_invalid');

      if (!validity) {
        error.textContent = 'Минимум 8 знаков. Обязательны ЗАГЛАВНАЯ буква и цифра';
        formState.password1IsValid = false;
      } else {
        formState.password1IsValid = true;
      }
    },
  },
});

const loginLink = new Link({
  text: 'Войти',
  events: {
    click() {
      router.go('/');
    },
  },
});

export default new SignUpForm({
  title: 'Регистрация',
  buttonText: 'Зарегистрироваться',
  linkText: 'Войти',
  error: '',
  loginInput,
  emailInput,
  firstNameInput,
  lastNameInput,
  phoneInput,
  passwordInput,
  passwordInput2,
  loginLink,
  events: {

    submit(event: Event) {
      event.preventDefault();

      // Собираем данные формы
      const form = new Form(
        this,
        '.button',
      );

      const formIsValid = Object.values(formState).every((value) => value);

      if (formIsValid) {
        const formData = form.collectData();

        // Отключим кнопку
        form.disableButton();

        const auth = new Auth();

        // eslint-disable-next-line max-len
        auth.signUp(formData).then((response: XMLHttpRequest) => {
          console.log(response);
          if (response.status === 200) {
            state.set('signUpForm', {
              error: 'Вы успешно зарегистрировались',
            });
            router.go('/login');
          } else {
            state.set('signUpForm', { error: 'Ошибка создания пользователя' });
          }
        }).catch((error) => {
          console.log(error);
          state.set('user', { logined: false });
          form.enableButton();
          state.set('signUpForm', {
            error: 'При отправке данных возникла ошибка',
          });
          router.go('/500');
        });
      } else {
        console.log('Форма невалидна, не выполняем запрос');
        state.set('signUpForm', {
          error: 'Пожалуйста, заполните форму корректно',
        });
      }
    },
  },
});
