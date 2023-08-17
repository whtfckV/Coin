import { el, setAttr, setChildren } from 'redom';
import WorkApi from "./WorkApi";

export default class YourCurrencies {
  constructor() {
    this.defaultClasses = 'currencies__block currencies__your your';
    <div this='el' class={this.defaultClasses}>
      <h3 class='currencies__title'>Ваши валюты</h3>
      <ul this='list' class='your__list'></ul>
    </div>
  };

  onmount() {
    this.fetch();
  };

  set load(bool) {
    this._load = bool;

    this._load ?
      setAttr(this.el, {
        className: `${this.defaultClasses} skeleton`
      }) :
      setAttr(this.el, {
        className: this.defaultClasses
      });
  };

  get load() {
    return this._load;
  };

  set data(payload) {
    this._data = Object.values(payload).filter(({ amount }) => !!amount);
    this.update();
  };

  get data() {
    return this._data;
  };

  async fetch() {
    this.load = true;
    try {
      const { payload, error } = await WorkApi.getCurrencyAccounts();
      if (error) {
        throw new Error(error);
      };
      this.data = payload;

    } catch (error) {
      throw new Error(error);
    } finally {
      this.load = false;
    };
  };

  update() {
    setChildren(this.list, [
      this.data.map(({ amount, code }) =>
        <li class='currency'>
          <span class='currency__name'>{code}</span>
          <span class='currency__amount'>{amount}</span>
        </li>
      )])
  };
};
