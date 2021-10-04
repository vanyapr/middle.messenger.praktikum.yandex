const template = `
  <section class="settings">
    <div class="settings__container">
      <figure class="settings__avatar">
          <img class="settings__avatar-image" width="130" height="130" src="{{ avatar }}" alt="{{ name }}">
          <figcaption class="settings__avatar-caption">
            <p class="settings__avatar-caption-text">Поменять аватар</p>
          </figcaption>
      </figure>
      <h1 class="settings__title">{{ name }}</h1>
  </div>

  </section>
`;

export default template;
