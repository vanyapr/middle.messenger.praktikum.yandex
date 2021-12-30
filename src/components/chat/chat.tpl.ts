const template = `
  <img src="{{ avatar }}" width="47" height="47" alt="{{ title }}" class="chat__logo">
  <div class="chat__info">
    <h2 class="chat__name">{{ title }}</h2>
    <p class="chat__last-message">{{ last_message.content }}</p>
  </div>
  <p class="chat__last-date">Ср</p>
  <p class="chat__messages">{{ unread_count }}</p>
`;

export default template;
