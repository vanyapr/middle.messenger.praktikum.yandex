const template = `
  <div class="error">
    <h1 class="error__title">{{ title }}</h1>
    <p class="error__status">{{ status }}</p>

    <button class="error__back" onclick='{{ action }}'>{{ buttonText }}</button>
  </div>
`;

export default template;
