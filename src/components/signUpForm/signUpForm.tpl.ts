const template = `
  <form class="form" onsubmit="{{ handleSubmit }}" novalidate>
    <h1 class="form__title">{{ title }}</h1>

    <div class="form__fields">
      <div class="form__group">
          <input class="input" name="login" id="login" type="text" placeholder=" " onkeyup="{{ validate }}" pattern="{{ loginValidator }}" required>
          <label for="login" class="label">Имя пользователя</label>
          <div class="form__error">Минимум 4 буквы, цифры или символа '-' и '_', </div>
      </div>
      <div class="form__group">
          <input class="input" name="email" id="email" type="text"  placeholder=" " onkeyup="{{ validate }}" pattern="{{ emailValidator }}" required>
          <label for="email" class="label">Адрес электронной почты</label>
          <div class="form__error">Введите корректный адрес электронной почты</div>
      </div>
      <div class="form__group">
          <input class="input" name="first_name" id="first_name" type="text"  placeholder=" " onkeyup="{{ validate }}" pattern="{{ nameValidator }}" required>
          <label for="first_name" class="label">Ваше имя</label>
          <div class="form__error">Введите имя с Заглавной буквы</div>
      </div>
      <div class="form__group">
          <input class="input" name="second_name" id="second_name" type="text"  placeholder=" " onkeyup="{{ validate }}" pattern="{{ nameValidator }}" required>
          <label for="second_name" class="label">Ваша фамилия</label>
          <div class="form__error">Введите фамилию с Заглавной буквы</div>
      </div>
      <div class="form__group">
          <input class="input" name="phone" id="phone" type="text"  placeholder=" " onfocus="{{ validate }}" onkeyup="{{ validate }}" pattern="{{ phoneValidator }}" required>
          <label for="phone" class="label">Номер телефона</label>
          <div class="form__error">Минимум десять цифр</div>
      </div>
      <div class="form__group">
          <input class="input" name="password" id="password" type="password"  placeholder=" " onfocus="{{ validate }}" onkeyup="{{ validate }}" pattern="{{ passwordValidator }}" required>
          <label for="password" class="label">Пароль</label>
          <div class="form__error">Минимум 8 символов. Пароль должен содержать ЗАГЛАВНУЮ букву и цифру</div>
      </div>
      <div class="form__group">
          <input class="input" name="password2" id="password2" type="password"  placeholder=" " onfocus="{{ validate }}" onkeyup="{{ validate }}" pattern="{{ passwordValidator }}" required>
          <label for="password2" class="label">Пароль ещё раз</label>
          <div class="form__error">Минимум 8 символов. Пароль должен содержать ЗАГЛАВНУЮ букву и цифру</div>
      </div>
    </div>

    <div class="form__controls">
        <div class="form__controls-error"></div>
        <button class="button button_state_success" type="submit">{{ buttonText }}</button>
        <a class="form__link" type="submit" onclick="{{ goRoute }}">{{ linkText }}</a>
  </div>


  </form>
`;

export default template;
