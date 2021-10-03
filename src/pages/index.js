// Движок рендера SHOW
import show from '../utils/render/index';

// Темплейт
// import template from '../components/test.tpl';
// import template2 from '../components/test2.tpl';
import message from '../components/error/index.js';

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

show(
  message,
  { status: 500,
    title: 'Мы уже фиксим',
    buttonText: 'Назад к чатам' },
  '#container',
);
// ez(template, data, '#root');
// ez(template2, data2, '#root');
