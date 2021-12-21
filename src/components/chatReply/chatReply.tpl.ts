const template = `
    <img src="{{ avatar }}" width="47" height="47" alt="{{ author }}" class="message__author">
    <p class="reply__box">
         {{ content }}
    </p>
    <p class="reply__date">{{ time }}</p>
`;

export default template;
