import './styles/normalize.scss';
import './styles/main.scss';
import './styles/header.scss';
import { el, mount } from 'redom';
import router from './router/router';
import App from './modules/App';
import Login from './modules/Login';

export const container = <div class='container'></div>;
export const main = el('main.main', container);
export const content = el('div.content');

export const app = <App />;
// console.log(app)

mount(document.body, app);

if (!localStorage.getItem('token')) {
  router.navigate('/');
};

router.resolve();
