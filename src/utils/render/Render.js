// Принимает тег, внутри которого будет осуществляться рендер и компилятор
class Renderer {
  constructor(container) {
    // Класс контейнера, в котором будет осуществлять рендер
    this._renderContainer = container;
  }

  // TODO: Вешаем листенеры
  // Ищем все события по клику/ховеру/и тд и заменяем их на листенеры?

  // Заполняет контейнер содержимым
  render(HTML) {
    // Рендер (пока что просто добавляем хтмл на страницу)
    this._renderContainer.insertAdjacentHTML('beforeend', HTML);
  }
}

export default Renderer;
