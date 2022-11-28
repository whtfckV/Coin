import { el } from 'redom';

export default function createNav() {
  return el('div.header__buttons', [
    el('a.btn.btn-l.btn-outline', {
      href: 'banks',
      'data-navigo': ''
    }, 'Банкоматы'),
    el('a.btn.btn-l.btn-outline.active', {
      href: 'accounts',
      'data-navigo': ''
    }, 'Счета'),
    el('a.btn.btn-l.btn-outline', {
      href: 'currencies',
      'data-navigo': ''
    }, 'Валюта'),
    el('button.btn.btn-l.btn-outline', 'Выйти'),
  ]);
}
