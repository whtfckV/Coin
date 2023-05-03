import { main } from '../../index.js';
import Login from '../../modules/Login';
import router from '../router'

export default function root() {
  if (localStorage.getItem('token')) {
    router.navigate('/accounts');
  }

  // Login.mount();
  main.classList.add('fix');
};
