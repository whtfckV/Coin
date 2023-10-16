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
    this.defaultCustomSelectClass = 'custom-select-container';
    this.elDefaultClass = 'accounts-top';
    this.backBtn = <button onclick={() => { history.back() }} this='btn' class='btn btn-primary btn-icon-text accounts-top__btn'>
      {topMenuiIcons.back}
      <span this='btnName'>Вернуться назад</span>
    </button>;
    this.createBtn = <button
      onclick={create}
      this='btn'
      class='btn btn-primary btn-icon-text accounts-top__btn'
      data-test='create'
    >{topMenuiIcons.create}
      <span this='btnName'>Создать новый счет</span>
    </button>;
    this.mySelect = <select id='sort' onchange={change}>
      {options.map(([value, name]) => <option value={value}>{name}</option>)}
    </select>;
    <div this='el' class={this.elDefaultClass}>
      <h1 this='title' class='main-title'>Ваши счета</h1>
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
    this.customSelect = null;
  };

  update(name) {
    switch (name) {
      case 'create':
        setAttr(this.title, {
          textContent: 'Ваши счета'
        });
        setAttr(this.el, {
          className: this.elDefaultClass
        });
        unmount(this.el, this.backBtn);
        mount(this.el, this.createBtn);
        if (this.customSelect) {
          mount(this.el, this.customSelect.container, this.createBtn);
        };
        break;
      case 'back':
        unmount(this.el, this.customSelect.container);
        setAttr(this.title, {
          textContent: 'Просмотр счёта',
        });
        setAttr(this.el, {
          className: `${this.elDefaultClass} mb-24`
        })
        unmount(this.el, this.createBtn);
        mount(this.el, this.backBtn);
        break;
      case 'currencies':
        unmount(this.el, this.customSelect.container);
        setAttr(this.title, {
          textContent: 'Валютный обмен',
        });
        setAttr(this.el, {
          className: `${this.elDefaultClass} mb-56`
        })
        unmount(this.el, this.createBtn);
        unmount(this.el, this.backBtn);
        break;
      case 'banks':
        unmount(this.el, this.customSelect.container);
        setAttr(this.title, {
          textContent: 'Карта банкоматов',
        });
        setAttr(this.el, {
          className: `${this.elDefaultClass} mb-56`
        })
        unmount(this.el, this.createBtn);
        unmount(this.el, this.backBtn);
        break;
    };
  };
};
