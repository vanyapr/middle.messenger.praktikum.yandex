// Добавляет элемент на страницу
export default class Renderer {
  _renderContainer: HTMLElement | null;

  constructor(containerSelector: string | null | undefined) {
    if (containerSelector) {
      // Класс контейнера, в котором будет осуществлять рендер
      this._renderContainer = document.querySelector(containerSelector);
    }
  }

  // Заполняет контейнер содержимым
  render(HTML: string) {
    console.log('Вызов рендера');
    if (this._renderContainer === null) {
      throw new Error('Контейнер рендера с указанным селектором не найден');
    }

    // Удаляем содержимое контейнера перед новым рендером
    this._renderContainer.innerHTML = '';

    // Рендер (пока что просто добавляем хтмл на страницу)
    this._renderContainer.insertAdjacentHTML('beforeend', HTML);
  }
}
