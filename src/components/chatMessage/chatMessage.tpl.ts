const template = `
    <img src="{{ avatar }}" width="47" height="47" alt="{{ author }}" class="message__author">
    <p class="message__box">
         {{ content }}
    </p>
    <p class="message__date">{{ time }}</p>
`;

export default template;
