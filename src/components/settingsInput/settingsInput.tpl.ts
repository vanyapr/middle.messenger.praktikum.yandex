const template = `
  <input class="settings__value" name="{{ name }}" id="{{ name }}" type="{{ type }}" placeholder=" " value="{{ value }}" required>
  <label for="{{ name }}" class="settings__label">{{ textName }}</label>
  <div class="settings__error">{{ errorText }}</div>
`;

export default template;
