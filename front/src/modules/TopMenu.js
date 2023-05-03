import { el, mount, setChildren, unmount } from 'redom';
import customSelect from 'custom-select';
import WorkApi from './WorkApi';
import { container } from '..';
import router from '../router/router';
import { topMenuiIcons } from '../scripts/Icons';
import { cards } from '../router/routes/accounts';


const select = el('select#sort', [
  el('option', { value: 'placeholder' }, 'Сортировка'),
  el('option', { value: 'account' }, 'По номеру'),
  el('option', { value: 'balance' }, 'По балансу'),
  el('option', { value: 'date' }, 'По последней транзакции'),
])

function create() {
  WorkApi.createAccount()
  cards.fetch().then(() => {
    cards.render();
    router.updatePageLinks();
  })
};

function back() {
  history.back();
};

export default class TopMenu {
  static title = el('h1.main-title', 'Ваши счета');
  static icon = topMenuiIcons.create;
  static btnName = el('span', 'Создать новый счёт')
  static btn = el('button.btn.btn-l.btn-primary.btn-icon-text.accounts-top__btn', [this.icon, this.btnName]);
  static element = el('div.accounts-top', [
    this.title,
    select,
    this.btn
  ]);
  static select = customSelect(select)[0];
  constructor() { };

  static mount() {
    this.select.value = localStorage.getItem('sorting') || '';

    this.select.select.addEventListener('change', () => {
      cards.sortProp = this.select.value;
    });

    this.btn.addEventListener('click', create);
    setChildren(container, this.element);
  };

  static changeIcon(name) {
    this.btn.removeEventListener('click', create);
    this.btn.removeEventListener('click', back);
    switch (name) {
      case 'create':
        this.btnName.textContent = 'Создать новый счёт';
        this.btn.addEventListener('click', create);
        break;
      case 'back':
        this.btnName.textContent = 'Вернуться назад';
        this.btn.addEventListener('click', back);
        mount(this.btn, topMenuiIcons[name], this.icon, true);
        break;
    }
    setChildren(this.btn, [
      topMenuiIcons[name],
      this.btnName
    ])
  }

  static update(path) {
    path !== 'accounts' && unmount(this.element, this.select.container);
    this.element.classList.remove('mb-30');

    if (isNaN(Number(path.split('/').slice(-1)))) {
      switch (path) {
        case 'accounts':
          this.title.textContent = 'Ваши счета';
          this.changeIcon('create');
          mount(this.element, this.select.container);
          mount(this.element, this.btn);
          break;
        case 'banks':
          this.title.textContent = 'Карта банкоматов';
          unmount(this.element, this.btn);
          break;
        case 'currencies':
          this.title.textContent = 'Валютный обмен';
          unmount(this.element, this.btn);
          break;
        default:
          this.changeIcon('back');
          break;
      }
    } else {
      this.title.textContent = 'Просмотр счёта';
      this.changeIcon('back');
      this.element.classList.add('mb-30');
    };
  };
};
