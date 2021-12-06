const template = `
    <div class="settings__container">
      <figure class="settings__avatar">
        <img class="settings__avatar-image" width="130" height="130" src="{{ avatar }}" alt="{{ display_name }}">
        <figcaption class="settings__avatar-caption">
          <p class="settings__avatar-caption-text">Поменять аватар</p>
        </figcaption>
      </figure>
      <h1 class="settings__title">{{ display_name }}</h1>
      {{ editSettingsForm }}
    </div>
`;

export default template;
