const template = `
    <aside class="sidebar">
        {{ search }}
        {{ chats }}
        {{ controls }}
    </aside>
    <section class="main">
       {{ header }}
       {{ messages }}
       {{ inputs }}
       <form class="inputs" onsubmit="{{ handleSubmit }}">
          <input type="text" name="message" class="inputs__input" placeholder="Введите сообщение" pattern="{{ notEmptyValidator }}">
          <label class="inputs__label" for="file">Загрузить файл</label>
          <input type="file" id="file" class="inputs__input_type_file">
          <button class="inputs__button">Отправить сообщение</button>
      </form>
    </section>
    {{popup}}
`;

export default template;
