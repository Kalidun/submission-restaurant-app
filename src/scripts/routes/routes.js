import Detail from '../views/pages/detail';
import Favorite from '../views/pages/favorite';
import Home from '../views/pages/Home';

const routes = {
  '/': Home,
  '/list': Home,
  '/detail/:id': Detail,
  '/favorite': Favorite
};

export default routes;