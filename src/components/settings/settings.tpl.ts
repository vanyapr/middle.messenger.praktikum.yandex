const template = `
  <section class="settings">
    <div class="settings__container">
      <figure class="settings__avatar">
        <img class="settings__avatar-image" width="130" height="130" src="{{ avatar }}" alt="{{ name }}">
        <figcaption class="settings__avatar-caption">
          <p class="settings__avatar-caption-text">Поменять аватар</p>
        </figcaption>
      </figure>
      <h1 class="settings__title">{{ display_name }}</h1>
      <div class="settings__form">
        <div class="settings__group">
          <div class="settings__value">{{ login }}</div>
          <label for="login" class="settings__label">Имя пользователя</label>
        </div>
        <div class="settings__group">
          <div class="settings__value">{{ email }}</div>
          <label for="email" class="settings__label">Адрес электронной почты</label>
        </div>
        <div class="settings__group">
          <div class="settings__value">{{ display_name }}</div>
          <label for="display_name" class="settings__label">Имя в чате (никнейм)</label>
        </div>
        <div class="settings__group">
          <div class="settings__value">{{ first_name }}</div>
          <label for="first_name" class="settings__label">Ваше имя</label>
        </div>
        <div class="settings__group">
          <div class="settings__value">{{ second_name }}</div>
          <label for="last_name" class="settings__label">Ваша фамилия</label>
        </div>
        <div class="settings__group">
          <div class="settings__value">{{ phone }}</div>
          <label for="phone" class="settings__label">Номер телефона</label>
        </div>
      </div>

      <div class="settings__controls">
        <div class="settings__group">
          <button class="settings__button" onclick="{{ editSettings }}">Изменить данные</button>
        </div>
        <div class="settings__group">
          <button class="settings__button" onclick="{{ editPassword }}">Изменить пароль</button>
        </div>
        <div class="settings__group">
          <button class="settings__button settings__button_color_red"  onclick="{{ handleLogout }}">Выйти</button>
        </div>
      </div>
    </div>
  </section>
`;

export default template;
