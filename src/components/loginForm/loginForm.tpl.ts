const template = `
  <form class="form" onsubmit="{{ handleSubmit }}" novalidate>
    <h1 class="form__title">{{ title }}</h1>

    <div class="form__fields">
      <div class="form__group">
          <input class="input" name="login" id="login" type="text" placeholder=" " onfocus="{{ validate }}" onblur="{{ validate }}" onkeyup="{{ validate }}" pattern="{{ loginValidator }}" required>
          <label for="login" class="label">Пользователь</label>
          <div class="form__error">Минимум 4 буквы, цифры или символа '-' и '_', </div>
      </div>
      <div class="form__group">
          <input class="input" name="password" id="password" type="password"  placeholder=" " onfocus="{{ validate }}" onblur="{{ validate }}" onkeyup="{{ validate }}" pattern="{{ passwordValidator }}" required>
          <label for="password" class="label">Пароль</label>
          <div class="form__error">Минимум 8 символов. Пароль должен содержать ЗАГЛАВНУЮ букву и цифру</div>
      </div>
    </div>

    <div class="form__controls">
        <button class="button" type="submit">{{ buttonText }}</button>
        <a href="/sign-up.html" class="form__link" type="submit">{{ linkText }}</a>
    </div>
  </form>
`;

export default template;
