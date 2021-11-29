const template = `
  <h1 class="form__title">{{ title }}</h1>

  <div class="form__fields">
    {{loginInput}}
    {{passwordInput}}
  </div>

  <div class="form__controls">
      <div class="form__controls-error">{{ error }}</div>
      <button class="button button_state_success" type="submit">{{ buttonText }}</button>
      <a class="form__link" type="submit" onclick="{{ goRoute }}">{{ linkText }}</a>
  </div>
`;

export default template;
