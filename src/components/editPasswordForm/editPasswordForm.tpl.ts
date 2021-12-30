const template = `
  {{ oldPasswordInput }}
  {{ newPasswordInput }}
  {{ newPasswordInput2 }}
  <div class="settings__controls settings__controls_type_button">
    <span class="settings__controls-error">{{ error }}</span>
    <button class="button button_state_success">Сохранить</button>
  </div>

`;

export default template;
