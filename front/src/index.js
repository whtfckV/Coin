import './styles/normalize.scss';
import './styles/main.scss';
import './styles/header.scss';
import { el, mount } from 'redom';
import router from './router/router';
import App from './modules/App';
import Login from './modules/Login';

export const container = <div class='container'></div>;
export const main = <main class='main'>{container}</main>;
export const content = <div class='content'></div>;

mount(document.body, <App />);

if (!localStorage.getItem('token')) {
  router.navigate('/');
};

router.resolve();
