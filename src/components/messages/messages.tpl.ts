const template = `
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
`;

export default template;
