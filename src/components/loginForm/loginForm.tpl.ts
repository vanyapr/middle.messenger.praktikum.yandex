const template = `
  <form class="form" onsubmit="{{ handleSubmit }}" novalidate>
    <h1 class="form__title">{{ title }}</h1>

    <div class="form__fields">
      <div class="form__group">
          <input class="input" name="login" id="login" type="text" placeholder=" " onfocus="{{ validate }}" onkeyup="{{ validate }}" pattern="{{ loginValidator }}" required value="snowflax">
          <label for="login" class="label">Пользователь</label>
          <div class="form__error">Минимум 4 буквы, цифры или символа '-' и '_', </div>
      </div>
      <div class="form__group">
          <input class="input" name="password" id="password" type="password"  placeholder=" " onfocus="{{ validate }}" onkeyup="{{ validate }}" pattern="{{ passwordValidator }}" required value="test12AAA">
          <label for="password" class="label">Пароль</label>
          <div class="form__error">Минимум 8 символов. Пароль должен содержать ЗАГЛАВНУЮ букву и цифру</div>
      </div>
    </div>

    <div class="form__controls">
        <button class="button" type="submit">{{ buttonText }}</button>
        <a class="form__link" type="submit" onclick="{{ goRoute }}">{{ linkText }}</a>
    </div>
  </form>
`;

export default template;
