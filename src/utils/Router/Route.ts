import Block from '../Block/Block';

class Route {
  private readonly _pathName: string

  private readonly _block: Block

  constructor(pathName: string, block: Block) {
    this._pathName = pathName;
    this._block = block;
  }

  private _match(pathName: string): boolean {
    // Если переданный путь равен сохраненному в роуте пути
    return pathName === this._pathName;
  }

  // Вызывает рендер компонента
  private _render() {
    if (this._block) {
      console.log(this._block);
      this._block.show();
    }
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
}

export default Route;
