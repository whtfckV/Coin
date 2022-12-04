import { el, mount, setChildren, svg, unmount } from 'redom';
import customSelect from 'custom-select';
import WorkApi from './WorkApi';

const icons = {
  create: svg('svg', {
    width: 16,
    height: 16,
    viewBox: '0 0 16 16',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg'
  }, svg('path', {
    d: 'M7.99999 7.69167e-06L8 8.00001M8 8.00001L8.00001 16M8 8.00001L16 8.00001M8 8.00001L0 8',
    stroke: 'white',
    'stroke-width': 2
  })),
  back: svg('svg', {
    width: 16,
    height: 12,
    viewBox: '0 0 16 12',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg'
  }, svg('path', {
    d: 'M3.83 5L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7L16 7V5L3.83 5Z',
    fill: 'white',
  }))
}

const select = el('select#sort', [
  el('option', { value: 'placeholder' }, 'Сортировка'),
  el('option', { value: 'account' }, 'По номеру'),
  el('option', { value: 'balance' }, 'По балансу'),
  el('option', { value: 'date' }, 'По последней транзакции'),
])
// <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <path d="M3.83 5L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7L16 7V5L3.83 5Z" fill="white"/>
// </svg>

function create(e) {
  e.target.dispatchEvent(new Event('create', {
    bubbles: true
  }));
};

function back() {
  history.back();
};

export default class TopMenu {
  constructor() {
    this.name;
    this.title = el('h1.main-title', this.name);
    this.icon;
    this.btn = el('button.btn.btn-l.btn-primary.btn-icon-text.accounts-top__btn', this.icon, this.btnName);
    this.element = el('div.accounts-top', [
      this.title,
      select,
      this.btn
    ]);
    this.select = customSelect(select)[0];
    this.select.value = localStorage.getItem('sorting') ?? '';
  }

  set name(string) {
    this._name = string;
    this.title.textContent = string;
  }
  get name() {
    return this._name
  }

  set icon(iconName) {
    this._icon = iconName;

    if (iconName === 'create') {
      setChildren(this.btn, [
        icons[iconName],
        el('span', 'Создать новый счёт')
      ]);

      this.btn.removeEventListener('click', back);
      this.btn.addEventListener('click', create);
    } else {
      setChildren(this.btn, [
        icons[iconName],
        el('span', 'Вернуться назад')
      ]);
      this.btn.removeEventListener('click', create);
      this.btn.addEventListener('click', back);
    }
  }
  get icon() {
    return this._icon
  }

  update(path = '/') {
    unmount(this.element, this.select.container);

    switch (path) {
      case 'accounts':
        this.name = 'Ваши счета';
        this.icon = 'create';
        mount(this.element, this.select.container);
        mount(this.element, this.btn);
        break;
      case 'banks':
        this.name = 'Карта банкоматов';
        unmount(this.element, this.btn);
        break;
      case 'currencies':
        this.name = 'Валютный обмен';
        unmount(this.element, this.btn);
        break;
      default:
        this.icon = 'back';
        break;
    }
  }
}
