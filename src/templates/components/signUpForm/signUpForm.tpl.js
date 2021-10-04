const template = `
  <form class="form">
    <h1 class="form__title">{{ title }}</h1>

    <div class="form__fields">
      <div class="form__group">
          <input class="input input_state_valid" name="login" id="login" type="text" placeholder=" " value="testuser" required>
          <label for="login" class="label">Имя пользователя</label>
      </div>
      <div class="form__group">
          <input class="input" name="email" id="email" type="text"  placeholder=" " required>
          <label for="email" class="label">Адрес электронной почты</label>
      </div>
      <div class="form__group">
          <input class="input" name="name" id="name" type="text"  placeholder=" " required>
          <label for="name" class="label">Ваше имя</label>
      </div>
      <div class="form__group">
          <input class="input" name="lastname" id="lastname" type="text"  placeholder=" " required>
          <label for="lastname" class="label">Ваша фамилия</label>
      </div>
      <div class="form__group">
          <input class="input" name="phone" id="phone" type="text"  placeholder=" " required>
          <label for="phone" class="label">Номер телефона</label>
      </div>
      <div class="form__group">
          <input class="input" name="password" id="password" type="password"  placeholder=" " required>
          <label for="password" class="label">Пароль</label>
      </div>
      <div class="form__group">
          <input class="input input_state_invalid" name="password2" id="password2" type="password"  placeholder=" " value="123" required>
          <label for="password2" class="label">Пароль ещё раз</label>
          <div class="form__error">Такой пароль уже использует пользователь <strong>Rickastley</strong></div>
      </div>
    </div>

    <div class="form__controls">
        <button class="button button_state_success" type="submit">{{ buttonText }}</button>
        <a href="/login.html" class="form__link" type="submit">{{ linkText }}</a>
  </div>


  </form>
`;

export default template;
