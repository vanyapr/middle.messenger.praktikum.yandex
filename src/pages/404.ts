// Компонент
import Error from '../components/error';
import Router from '../utils/Router/Router';
const router = new Router();

export default new Error({
  status: 404,
  title: 'Не туда попали',
  buttonText: 'Назад к чатам',
  action() {
    router.back();
  },
},
'#container');
