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
    {{popup}}
`;

export default template;
