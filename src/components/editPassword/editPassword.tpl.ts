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
      <form class="settings__form" onsubmit="{{ handleSubmit }}" novalidate>
        <div class="settings__group">
          <input class="settings__value" name="password" id="password" type="password" onfocus="{{ validate }}" onblur="{{ validate }}" onkeyup="{{ validate }}" pattern="{{ passwordValidator }}" required>
          <label for="password" class="settings__label">Старый пароль</label>
          <div class="settings__error">Минимум 4 буквы, цифры или символы '-' и '_', </div>
        </div>
        <div class="settings__group">
          <input class="settings__value" name="newPassword" id="newPassword" type="password" onfocus="{{ validate }}" onblur="{{ validate }}" onkeyup="{{ validate }}" pattern="{{ passwordValidator }}" required>
          <label for="newPassword" class="settings__label">Новый пароль</label>
          <div class="settings__error">Минимум 4 буквы, цифры или символы '-' и '_', </div>
        </div>
        <div class="settings__group">
          <input class="settings__value" name="newPassword2" id="newPassword2" type="password" onfocus="{{ validate }}" onblur="{{ validate }}" onkeyup="{{ validate }}" pattern="{{ passwordValidator }}" required>
          <label for="newPassword2" class="settings__label">Повторите новый пароль</label>
          <div class="settings__error">Минимум 4 буквы, цифры или символы '-' и '_', </div>
        </div>

        <div class="settings__controls settings__controls_type_button">
          <button class="button button_state_success">Сохранить</button>
        </div>
      </form>
    </div>
  </section>
`;

export default template;
