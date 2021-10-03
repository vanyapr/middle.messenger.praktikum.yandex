// Движок рендера EZ (EAZY)
import ez from '../utils/render/index';

// Темплейт
import template from '../components/test.tpl';
import template2 from '../components/test2.tpl';

// Данные темплейта
const data = {
  title: 'Заголовок страницы',
};

const data2 = {
  desc: 'Дескрипшен ',
  lol: 'test value 1',
  lol2() {
    console.log('Нажал на дескрипшен');
  },
};

ez(template, data, '#root');
ez(template2, data2, '#root');
