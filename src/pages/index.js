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
  title: 'Заголовок страницы 2',
};

ez(template, data, '#root');
ez(template2, data2, '#root');
