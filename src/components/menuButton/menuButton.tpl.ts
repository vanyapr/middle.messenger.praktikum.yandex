const template = `
  <button class="menu-button" onclick="{{ clickAction }}">
    <i class="menu-button__icon menu-button__icon_{{ iconType }}">Иконка кнопки</i>
    <span class="menu-button">{{ buttonText }}</span>
  </button>
`;

export default template;
