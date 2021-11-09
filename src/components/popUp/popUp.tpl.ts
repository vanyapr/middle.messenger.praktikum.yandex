const template = `
  <div class="popup close" onclick="{{ closePopup }}">
    <div class="popup__container">
      <button class="popup__close close" onclick="{{ closePopup }}">Закрыть всплывающее окно</button>
      {{ children }}
    </div>
  </div>
`;

export default template;
