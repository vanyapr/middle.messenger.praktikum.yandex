require('jsdom-global')()
const { expect } = require('chai');
const { default: Route } = require('./Route');

describe('Тестирование роутера', () => {
  const fakeBlock = { display: () => void {} }


  describe('Тесты роута', function () {
    it('Возвращаемое значение - строка', () => {
      // Роут для тестов
      const testRoute = new Route('test', fakeBlock);
      expect(testRoute.getPath()).to.be.a('string');
    });
  })
})

export = {
}