const template = `
  <section class="settings">
    <button class="back-button__button" onclick="{{ back }}">{{ buttonText }}</button>
    {{ children }}
  </section>
`;

export default template;
