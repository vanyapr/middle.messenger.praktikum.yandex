const template = `
    <h1 class="form__title">{{ title }}</h1>

    <div class="form__fields">
      <div class="form__group">
          <input class="input" name="login" id="login" type="text" placeholder=" " onfocus="{{ validate }}" onblur="{{ validate }}" onkeyup="{{ validate }}" pattern="{{ loginValidator }}" required>
          <label for="login" class="label">Пользователь</label>
          <div class="form__error">Минимум 4 буквы, цифры или символа '-' и '_', </div>
      </div>
    </div>

    <div class="form__controls">
        <button class="button button_state_success" type="submit">{{ buttonText }}</button>
    </div>
`;

export default template;
