const template = `
<section class="chats">
            <div class="chat">
                <img src="{{ avatar }}" width="47" height="47" alt="" class="chat__logo">
                <div class="chat__info">
                  <h2 class="chat__name">Имя чата</h2>
                  <p class="chat__last-message">Привет! Смотри, тут всплыл интересный Поиск контактовплыл интересный </p>
                </div>
                <p class="chat__last-date">Ср</p>
                <p class="chat__messages">2</p>
                <button class="chat__edit">Редактировать чат</button>
            </div>
            <div class="chat">
                <img src="{{ avatar }}" width="47" height="47" alt="" class="chat__logo">
                <div class="chat__info">
                  <h2 class="chat__name">Имя чата</h2>
                  <p class="chat__last-message chat__last-message_type_own">Вы: Привет! Смотри, тут всплыл интересный Поиск контактовплыл интересный </p>
                </div>
                <p class="chat__last-date">11:30</p>
                <p class="chat__messages">42</p>
                <button class="chat__edit">Редактировать чат</button>
            </div>
        </section>
`;

export default template;
