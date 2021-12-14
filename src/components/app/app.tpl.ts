const template = `
    <aside class="sidebar">
        {{ search }}
        {{ chats }}
        {{ controls }}
    </aside>
    <section class="main">
       {{ header }}
       {{ messages }}
       {{ messageForm }}
    </section>
    {{ addUserPopup }}
    {{ addChatPopup }}
`;

export default template;
