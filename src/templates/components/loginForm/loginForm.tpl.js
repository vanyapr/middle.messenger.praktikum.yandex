const template = `
  <form class="form">
    <h1 class="form__title">{{ title }}</h1>

    <div class="form__fields">
      <div class="form__group">
          <input class="input" name="login" id="login" type="text" placeholder=" " required>
          <label for="login" class="label">Пользователь</label>
      </div>
      <div class="form__group">
          <input class="input" name="password" id="password" type="password"  placeholder=" " required>
          <label for="password" class="label">Пароль</label>
      </div>
    </div>

    <div class="form__controls">
        <button class="button" type="submit">{{ buttonText }}</button>
        <a href="/sign-up.html" class="form__link" type="submit">{{ linkText }}</a>
    </div>
  </form>
`;

export default template;
