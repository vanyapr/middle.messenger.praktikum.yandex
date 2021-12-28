export {};
const assert = require('assert');
const { expect } = require('chai');
const { default: renderer } = require('./index.ts');

describe('Тестирование рендер движка', () => {
  describe('Проверка возвращаемых значений', () => {
    it('Возвращаемое значение - строка', () => {
      expect(renderer('Тестовая строка123"№123фыв{{}}', {}).getString()).to.be.a('string');
    });

    it('Пустой темплейт корректно обрабатывается', () => {
      assert.equal(renderer('', {}).getString(), '');
    });
  });

  describe('Проверка замены значений', () => {
    it('Переменные заменяются {{variable}}', () => {
      assert.equal(renderer('{{variable}}', {variable: 'test'}).getString(), 'test');
    });

    it('Пробелы в переменных не учитываются {{    variable  }}', () => {
      assert.equal(renderer('{{    variable      }}', {variable: 'test'}).getString(), 'test');
    });

    it('Лишние скобки не учитываются {{{variable }}} => {test}', () => {
      assert.equal(renderer('{{{variable }}}', {variable: 'test'}).getString(), '{test}');
    });

    it('Переменные корректно обнаруживаются', () => {
      assert.equal(renderer('{variable}{{{variable }}}variable', {variable: 'test'}).getString(), '{variable}{test}variable');
    });
  })

});
