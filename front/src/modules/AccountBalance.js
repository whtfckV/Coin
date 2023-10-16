import { el, setAttr } from 'redom';

export default class AccountBalance {
  constructor() {
    this.load;
    <div this='el' class='account__balance balance'>
      <strong class='account__mame'>Баланс</strong>
      <span this='balance' class='balance__amount'></span>
    </div>
  };

  set load(bool) {
    this._load = bool;
    this.load ? setAttr(this.el, {
      className: 'account__balance skeleton',
    }) : setAttr(this.el, {
      className: 'account__balance'
    });
  };

  get load() {
    return this._load;
  };

  set data(amount) {
    this._data = amount;
    setAttr(this.balance, {
      textContent: this.data + ' ₽',
    });
  };

  get data() {
    return this._data;
  };
};
