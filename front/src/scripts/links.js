import { el } from 'redom';

export default function createLinks() {
  return [
    el('a.btn.btn-l.btn-outline', {
      href: '/banks',
      'data-navigo': ''
    }, 'Банкоматы'),
    el('a.btn.btn-l.btn-outline', {
      href: '/accounts',
      'data-navigo': ''
    }, 'Счета'),
    el('a.btn.btn-l.btn-outline', {
      href: '/currencies',
      'data-navigo': ''
    }, 'Валюта'),
    el('a.btn.btn-l.btn-outline', {
      href: '',
      'data-navigo': '',
      onclick() {
        localStorage.removeItem('token');
      }
    }, 'Выйти'),
  ];
}
