// Добавляет элемент на страницу
export default class Renderer {
  _renderContainer: HTMLElement | null;

  constructor(container: string) {
    // Класс контейнера, в котором будет осуществлять рендер
    this._renderContainer = document.querySelector(container);
  }

  // Заполняет контейнер содержимым
  render(HTML: string) {
    if (this._renderContainer === null) {
      throw new Error('Элемент с таким селектором не найден');
    }

    // Удаляем содержимое контейнера перед рендером
    // FIXME: При изменении пропсов надо заменять содержимое контейнера
    // this._renderContainer.innerHTML = '';

    // Рендер (пока что просто добавляем хтмл на страницу)
    this._renderContainer.insertAdjacentHTML('beforeend', HTML);
  }
}
