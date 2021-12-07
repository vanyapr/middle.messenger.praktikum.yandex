const template = `
    <h1 class="form__title">{{ title }}</h1>

    <div class="form__fields">
      <div class="form__file">
        {{ fileUploadInput }}
      </div>
    </div>


    <div class="form__controls">
        <button class="button button_state_success" type="submit">{{ buttonText }}</button>
    </div>
`;

export default template;
