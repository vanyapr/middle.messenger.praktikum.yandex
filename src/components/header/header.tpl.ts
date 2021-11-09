const template = `
  <header class="header">
    <h1 class="header__title">{{ title }}</h1>
    <button class="header__settings" onclick="{{ buttonClick }}">Редактировать чат</button>
    {{ menu }}
  </header>
`;

export default template;
