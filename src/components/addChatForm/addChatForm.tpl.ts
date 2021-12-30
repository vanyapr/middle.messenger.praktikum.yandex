const template = `
    <h1 class="form__title">{{ title }}</h1>

    <div class="form__fields">
      {{ chatNameInput }}
    </div>

    <div class="form__controls">
        <div class="form__controls-error">{{ error }}</div>
        <button class="button button_state_success" type="submit">{{ buttonText }}</button>
    </div>
`;

export default template;
