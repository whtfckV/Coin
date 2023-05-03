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

const router = new Navigo('/');
router.hooks({
  after({ url }) {
    nav.update(url)
    content.update(url);
    console.log('ss')
    // new TopMenu.update(url);
  }
});

router.on({
  '/': app.update,
  '/accounts': app.update,
  '/account/:id': app.update,
  '/currencies': app.update,
  // '/currencies': {
  //   uses: currencies,
  //   hooks: {
  //     leave(done, match) {
  //       strim.close();
  //       done();
  //     }
  //   }
  // },
  'banks': app.update,
});
export default router;
