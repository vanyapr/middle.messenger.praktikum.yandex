// Компонент
import Error from '../components/error';
import Router from '../utils/Router/Router';
import Link from '../components/link/link';
const router = new Router();

const backLink = new Link({
  text: 'Назад к чатам',
  events: {
    click() {
      router.back();
    },
  },
});

export default new Error({
  status: 404,
  title: 'Не туда попали',
  backLink,
});
