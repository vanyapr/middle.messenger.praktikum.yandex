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
      <form class="settings__form"  onsubmit="{{ handleSubmit }}" novalidate>
        <div class="settings__group">
          <input class="settings__value" name="login" id="login" type="text" placeholder=" " value="testuser" onfocus="{{ validate }}" onblur="{{ validate }}" onkeyup="{{ validate }}" pattern="{{ loginValidator }}" required>
          <label for="login" class="settings__label">Имя пользователя</label>
          <div class="settings__error">Минимум 4 буквы, цифры или символы '-' и '_', </div>
        </div>
        <div class="settings__group">
          <input class="settings__value" name="email" id="email" type="text" placeholder=" " value="noreply@example.com" onfocus="{{ validate }}" onblur="{{ validate }}" onkeyup="{{ validate }}" pattern="{{ emailValidator }}" required>
          <label for="email" class="settings__label">Адрес электронной почты</label>
          <div class="settings__error">Введите корректный адрес электронной почты</div>
        </div>
        <div class="settings__group">
          <input class="settings__value" name="display_name" id="display_name" type="text" placeholder=" " value="Иван" onfocus="{{ validate }}" onblur="{{ validate }}" onkeyup="{{ validate }}" pattern="{{ nameValidator }}" required>
          <label for="display_name" class="settings__label">Имя в чате (никнейм)</label>
          <div class="settings__error">Минимум 4 буквы, цифры или символы '-' и '_', </div>
        </div>
        <div class="settings__group">
          <input class="settings__value" name="first_name" id="first_name" type="text" placeholder=" " value="Иван" onfocus="{{ validate }}" onblur="{{ validate }}" onkeyup="{{ validate }}" pattern="{{ nameValidator }}" required>
          <label for="first_name" class="settings__label">Ваше имя</label>
          <div class="settings__error">Введите имя с Заглавной буквы</div>
        </div>
        <div class="settings__group">
          <input class="settings__value" name="last_name" id="last_name" type="text" placeholder=" " value="Иванов" onfocus="{{ validate }}" onblur="{{ validate }}" onkeyup="{{ validate }}" pattern="{{ nameValidator }}" required>
          <label for="last_name" class="settings__label">Ваша фамилия</label>
          <div class="settings__error">Введите фамилию с Заглавной буквы</div>
        </div>
        <div class="settings__group">
          <input class="settings__value" name="phone" id="phone" type="text" placeholder=" " value="+71231234567" onfocus="{{ validate }}" onblur="{{ validate }}" onkeyup="{{ validate }}" pattern="{{ phoneValidator }}" required>
          <label for="phone" class="settings__label">Номер телефона</label>
          <div class="settings__error">Минимум десять цифр</div>
        </div>

        <div class="settings__controls settings__controls_type_button">
          <button class="button button_state_success">Сохранить</button>
        </div>
      </form>


    </div>
  </section>
`;

export default template;
