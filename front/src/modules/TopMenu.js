import { el, mount, setAttr, unmount } from 'redom';
import customSelect from 'custom-select';
import { topMenuiIcons } from '../scripts/Icons';


const options = [
  ['placeholder', 'Сортировка'],
  ['account', 'По номеру'],
  ['balance', 'По балансу'],
  ['date', 'По последней транзакции'],
];

export default class TopMenu {
  constructor({ create, change }) {
    this.backBtn = <button onclick={() => { history.back() }} this='btn' class='btn btn-primary btn-icon-text accounts-top__btn'>
      {topMenuiIcons.back}
      <span this='btnName'>Вернуться назад</span>
    </button>;
    this.createBtn = <button onclick={create} this='btn' class='btn btn-primary btn-icon-text accounts-top__btn'>
      {topMenuiIcons.create}
      <span this='btnName'>Создать новый счет</span>
    </button>;
    this.mySelect = <select id='sort' onchange={change}>
      {options.map(([value, name]) => <option value={value}>{name}</option>)}
    </select>;
    <div this='el' class='accounts-top'>
      <h1 class='main-title'>Ваши счета</h1>
      {this.mySelect}
      {this.createBtn}
    </div>
  };

  onmount() {
    this.customSelect = customSelect(this.mySelect)[0];
    this.customSelect.value = localStorage.getItem('sorting') || '';
  };

  onunmount() {
    this.customSelect.destroy();
  };

  /*
    НЕ МОГУ СКРЫТЬ СЕЛЕКТ
  */

  changeButton(name) {
    switch (name) {
      case 'create':
        unmount(this.el, this.backBtn);
        mount(this.el, this.createBtn);
        // if (!this.el.contains(this.mySelect)) {
        //   console.log('ee')
        // }
        break;
      case 'back':
        // unmount(this.el, this.mySelect);
        unmount(this.el, this.createBtn);
        mount(this.el, this.backBtn);
        break;
    };
  };

  /*
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
