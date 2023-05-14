import { el, setAttr, setChildren } from 'redom';
import router from '../router/router';

const hrefs = [
  ['/banks', 'Банкоматы'],
  ['/accounts', 'Счета'],
  ['/currencies', 'Валюта'],
  ['', 'Выйти']
];

const createLink = ([href, name]) =>
  <a class='btn btn-l btn-outline' href={href} data-navigo='' onclick={href ? () => { } : () => {
    localStorage.removeItem('token');
    router.navigate('/');
  }}>{name}</a>;

export default class Nav {
  constructor() {
    this.links = hrefs.map(createLink);
    <nav this='el' class='header__nav'>
      {this.links}
    </nav>
  };

  update(url) {
    this.path = url;
    if (!this.path) {
      setChildren(this.el, '');
    } else {
      setChildren(this.el, this.links);
    };
    this.links.forEach(link => {
      setAttr(link, {
        ariaCurrent: false,
      });

      if (link.getAttribute('href').slice(1) === this.path && this.path !== '') {
        setAttr(link, {
          ariaCurrent: 'page',
        })
      };
    })
  }
};
