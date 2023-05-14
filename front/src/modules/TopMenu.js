import { el, mount, setChildren, unmount } from 'redom';
import customSelect from 'custom-select';
import WorkApi from './WorkApi';
import { container } from '..';
import router from '../router/router';
import { topMenuiIcons } from '../scripts/Icons';
import { cards } from '../router/routes/accounts';


const options = [
  ['placeholder', 'Сортировка'],
  ['account', 'По номеру'],
  ['balance', 'По балансу'],
  ['date', 'По последней транзакции'],
];

// function create() {
//   WorkApi.createAccount()
//   cards.fetch().then(() => {
//     cards.render();
//     router.updatePageLinks();
//   })
// };

// function back() {
//   history.back();
// };


/*
      ПРОБЛЕМА СОЗДАНИЯ КАСТОМНОГО СЕЛЕКТА
*/
export default class TopMenu {
  constructor() {
    this.mySelect = <select id='sort'>
      {options.map(([value, name]) => <option value={value}>{name}</option>)}
    </select>
    console.log(this.mySelect)
    debugger;
    this.select = customSelect(this.mySelect)[0];
    // this.select = <select id='sort'>
    //   {options.map(([value, name]) => <option value={value}>{name}</option>)}
    // </select>;
    // console.log(this.customSelect);
    <div this='el' class='account-top'>
      <h1 class='main-title'>Ваши счета</h1>
      {this.select}
      <button this='btn' class='btn btn-primary btn-icon-text account-top__btn'>
        {topMenuiIcons.create}
        <span this='btnName'>Созлать новый счет</span>
      </button>
    </div>
    // this.customSelect = customSelect(this.select)[0];
  };

  mount() {
    console.log('sd')
  }

  // static mount() {
  //   this.select.value = localStorage.getItem('sorting') || '';

  //   this.select.select.addEventListener('change', () => {
  //     cards.sortProp = this.select.value;
  //   });

  //   this.btn.addEventListener('click', create);
  //   setChildren(container, this.element);
  // };

  /*changeIcon(name) {
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

  update(path) {
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
  };*/
};
