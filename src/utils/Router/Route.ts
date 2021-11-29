import Block from '../Block/Block';
import Renderer from '../Render/Render';

class Route {
  private readonly _pathName: string

  private readonly _block: Block

  constructor(pathName: string, block: Block) {
    this._pathName = pathName;
    this._block = block;
  }

  // Получить путь роута
  getPath(): string {
    return this._pathName;
  }

  // Переход по роуту
  navigate(pathName: string): void {
    if (this._match(pathName)) {
      // Если переданный путь совпадает, вызовем рендер
      this._render();
    }
  }

  private _match(pathName: string): boolean {
    // Если переданный путь равен сохраненному в роуте пути
    return pathName === this._pathName;
  }

  // Вызывает рендер компонента
  private _render() {
    // Если передан блок
    if (this._block) {
      console.log('Рендер?');
      this._block.display();
    }
  }
}

export default Route;
