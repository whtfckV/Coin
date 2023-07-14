import { el, setAttr } from 'redom';

export default class AccountBalance {
  constructor() {
    <div this='el' class='top-info__balance'>
      <strong class='top-info__mame'>Баланс</strong>
      <span this='balance' class='balance__amount'></span>
    </div>
    this.data;
    this.load;
  };

  set load(bool) {
    this._load = bool;
    this.load ? setAttr(this.el, {
      className: 'top-info__balance skeleton',
    }) : setAttr(this.el, {
      className: 'top-info__balance'
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
