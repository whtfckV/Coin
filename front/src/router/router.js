import Navigo from 'navigo';
import { nav } from '../modules/Header';
import { content } from '../modules/App';
import { setChildren } from 'redom';


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
  '/accounts/:id': changeRout,
  '/accounts/:id/detailed-balance': changeRout,
  '/currencies': changeRout,
  'banks': changeRout,
  'notFound': changeRout,
});

// router.notFound(() => );
export default router;
