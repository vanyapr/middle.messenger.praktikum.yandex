const template = `
    <aside class="sidebar">
        <header class="search">
            <input type="text" class="search__input" placeholder="Поиск контактов">
        </header>

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

        <footer class="controls">
            <button class="button button_state_success">Добавить контакт</button>
        </footer>
    </aside>
    <section class="main">
        <header class="header">
            <h1 class="header__title">Заголовок чата будет здесь!</h1>
            <button class="header__settings">Редактировать чат</button>
        </header>

        <section class="messages">
            <div class="message">
                <img src="{{ avatar }}" width="47" height="47" alt="{{ author }}" class="message__author">
                <p class="message__box">
                     Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
                     Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
                </p>
                <p class="message__date">11:30</p>
                <p class="message__box">
                     Привет унной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну.
                </p>
                <p class="message__date">11:35</p>
                <p class="message__box">
                    <img src="https://via.placeholder.com/468x468" alt="">
                </p>
                <p class="message__date">11:35</p>
            </div>
            <div class="reply">
                <img src="{{ avatar }}" width="47" height="47" alt="{{ author }}" class="reply__author">
                <p class="reply__box">
                     Привет, это ответное сообщение
                </p>
                <p class="reply__date reply__date_state_viewed">11:35</p>
                <p class="reply__box">
                    <img src="https://via.placeholder.com/468x468" alt="">
                </p>
                <p class="reply__date">11:35</p>
            </div>
        </section>

        <footer class="inputs">
            <input type="text" name="message" class="inputs__input" placeholder="Введите сообщение">
            <label class="inputs__label" for="file">Загрузить файл</label>
            <input type="file" id="file" class="inputs__input_type_file">
<!--sdas-->
            <button class="inputs__button">Отправить сообщение</button>
        </footer>
    </section>
`;

export default template;
