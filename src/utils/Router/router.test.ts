const { JSDOM } = require("jsdom");
const { expect } = require('chai');
const { default: Route } = require('./Route');
const { default: Router } = require('./Router');


describe('Тестирование роутера', () => {
  beforeEach(() => {
    // Мокап DOM
    (global as any).document = new JSDOM('<div id="root"></div>', {
      url: 'http://localhost'
    });
    // Мокап window
    (global as any).window = (global as any).document.window;
  })

  const fakeBlock = { display: (): boolean =>  { return true } }

  describe('Тесты роута', function () {
    it('Возвращаемое значение - строка', () => {
      const testRoute = new Route('test', fakeBlock);
      expect(testRoute.getPath()).to.be.a('string');
    });
  })

  describe('Тесты роутера', function () {
    it('Является синглтоном', () => {
      const router = new Router();
      expect(new Router()).to.be.equal(router);
    });

    it('Метод use() возвращает экземпляр класса', () => {
      const router = new Router();
      expect(new Router().use('testPath'), fakeBlock).to.be.equal(router);
    });

    it('Метод go() вызывает рендер элемента', () => {
      const router = new Router();
      router.use('/', fakeBlock);
      expect(router.go('/')).to.be.equal(undefined);
    });
  })


})

export = {
}
