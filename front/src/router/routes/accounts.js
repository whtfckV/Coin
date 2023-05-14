import { setChildren } from 'redom';
import { main, container } from '../../index.js';
import router from '../router';
import CardList from '../../modules/CardsList.js';

export const cards = new CardList();

export default function accounts() {
  // main.classList.remove('fix');

  // setChildren(main, container);
  // cards.mount();

  // cards.fetch().then(() => {
  //   cards.sortProp = localStorage.getItem('sorting');
  //   router.updatePageLinks();
  // });
};
