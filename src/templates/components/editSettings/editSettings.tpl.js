const template = `
  <section class="settings">
    <div class="settings__container">
      <figure class="settings__avatar">
        <img class="settings__avatar-image" width="130" height="130" src="{{ avatar }}" alt="{{ name }}">
        <figcaption class="settings__avatar-caption">
          <p class="settings__avatar-caption-text">Поменять аватар</p>
        </figcaption>
      </figure>
      <h1 class="settings__title">{{ name }}</h1>
      <div class="settings__form">
        <div class="settings__group">
          <input class="settings__value" name="login" id="login" type="text" placeholder=" " value="testuser" required>
          <label for="login" class="settings__label">Имя пользователя</label>
        </div>
        <div class="settings__group">
          <input class="settings__value" name="email" id="email" type="text" placeholder=" " value="noreply@example.com" required>
          <label for="email" class="settings__label">Адрес электронной почты</label>
        </div>
        <div class="settings__group">
          <input class="settings__value" name="display_name" id="display_name" type="text" placeholder=" " value="Иван" required>
          <label for="display_name" class="settings__label">Имя в чате (никнейм)</label>
        </div>
        <div class="settings__group">
          <input class="settings__value" name="first_name" id="first_name" type="text" placeholder=" " value="Иван" required>
          <label for="first_name" class="settings__label">Ваше имя</label>
        </div>
        <div class="settings__group">
          <input class="settings__value" name="last_name" id="last_name" type="text" placeholder=" " value="Иванов" required>
          <label for="last_name" class="settings__label">Ваша фамилия</label>
        </div>
        <div class="settings__group">
          <input class="settings__value" name="phone" id="phone" type="text" placeholder=" " value="8 (213) 123-45-67" required>
          <label for="phone" class="settings__label">Номер телефона</label>
        </div>
      </div>

      <div class="settings__controls settings__controls_type_button">
        <button class="button button_state_success" onclick="{{ back }}">Сохранить</button>
      </div>
    </div>
  </section>
`;

export default template;
