import Block from '../Block/Block';
import Route from './Route';

interface IRotuer {
  // Будет связывать роут с блоком
  use(path: string, block: Block): void
  // Будет запускать роутер
  run(): void
  // Будет выполнять переход по роуту
  go(path: string): void
  back(): void
  forward(): void
}

// Роутер используется для перехода между экранами без перезагрузки страницы
class Router implements IRotuer {
  // private _currentRoute: string;
  //
  // private _currentBlock: Block;

  // Объявили приватное статическое поле instance
  // Это поле будет хранить синглтон роутера
  private static __instance: any

  private _routes: any[]

  private _history: History

  constructor() {
    // Если у класса уже существует экземпляр
    if (Router.__instance) {
      // Возвращаем инстанс класса
      return Router.__instance;
    }

    // TODO: Урл адрес по умолчанию объявлять в конструкторе роутера
    // this._currentRoute = defaultRoute;
    // this._currentBlock = defaultBlock;

    // Роуты будем хранить в массиве
    this._routes = [];
    // Запишем в поле класса ссылку на window.history
    this._history = window.history;

    // Если экземпляра класса не существует, создаём его
    Router.__instance = this;
  }

  // Возвращает роут если он есть в списке роутов
  private _getRoute(path: string): Route {
    // Находим роут, и возвращаем роут с таким path
    return this._routes.find((route) => route.getPath() === path);
  }

  // Действие при смене роута
  private _onRouteChange(path: string) {
    // 1) Получаем соответствующий роут
    const route = this._getRoute(path);
    // 2) Вызываем рендер роутера (через переход)
    if (route) {
      route.navigate(path);
    } else {
      throw new Error('Такого роута не существует');
    }
  }

  // Связывает роут с блоком, который по роуту будет рендериться
  use(path: string, block: Block): Router {
    // Мы записываем роут в класс роут и добавляем в список роутов
    const route = new Route(path, block);

    // Добавляем роут в список роутов
    this._routes.push(route);
    // Мы возвращаем this для того, чтобы дальше через . повторно вызывать метод
    return this;
  }

  // Стартует роутер на прослушивание событий
  run(): void {
    // Запускает слушатель в window.onpopstate
    window.onpopstate = (event) => {
      console.log(event);
      // Срабатывает при нажатии на кнопки "вперед - назад"
      const { currentTarget } = event as PopStateEvent;

      if (currentTarget) {
        // Фиксим ошибку тайпскрипта
        this._onRouteChange((currentTarget as Document).location.pathname);
      }
    };

    this._onRouteChange(window.location.pathname);
  }

  // Выполняет переход по роуту
  go(path: string): void {
    // Записываем в history новый урл
    this._history.pushState({}, '', path);

    // Вызываем сам переход
    this._onRouteChange(path);
  }

  // Назад по истории
  back(): void {
    // Перейти на 1 шаг назад
    this._history.go(-1);
  }

  // Вперед по истории
  forward(): void {
    // Перейти на 1 шаг вперёд
    this._history.go(1);
  }
}

export default Router;
