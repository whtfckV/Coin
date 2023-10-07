import Navigo from 'navigo';
import { nav } from '../modules/Header';
import { content } from '../modules/App';


const changeRout = ({ url, data }) => {
  content.update(url, data);
};

const router = new Navigo('/');

router.hooks({
  after({ url }) {
    nav.update(url)
  }
});

router.on({
  '/': changeRout,
  '/accounts': changeRout,
  '/account/:id': changeRout,
  '/account/:id/detailed-balance': changeRout,
  '/currencies': changeRout,
  'banks': changeRout,
});
export default router;
