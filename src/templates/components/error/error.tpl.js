const template = `
  <div class="error">
    <h1 class="error__title">{{ title }}</h1>
    <p class="error__status">{{ status }}</p>
    <!--  Если указываем {{ action }}, то какой-то бред с рендером  -->
    <!--  Если указываем {{action}}, то какой-то рендерит корректно  -->
    <!--  Если удалить эти коментарии, то рендериться всё перестанет. Вопрос ревьюеру: куда копать, и что происходит??? -->
    <button class="error__back" onclick='{{ action }}'>{{ buttonText }}</button>
  </div>
`;

export default template;
