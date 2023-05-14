import Navigo from 'navigo';
import { nav } from '../modules/Header';
import accounts from './routes/accounts';
import root from './routes/root';
import account from './routes/account';
import banks from './routes/banks';
import currencies, { strim } from './routes/currencies';
import TopMenu from '../modules/TopMenu';
import { content } from '../modules/App';
import { app } from '..';


const changeRout = ({ url }) => {
  content.update(url);
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
  '/currencies': changeRout,
  // '/currencies': {
  //   uses: currencies,
  //   hooks: {
  //     leave(done, match) {
  //       strim.close();
  //       done();
  //     }
  //   }
  // },
  'banks': changeRout,
});
export default router;
