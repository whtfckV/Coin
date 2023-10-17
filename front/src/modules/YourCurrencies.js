import { el, setAttr, setChildren } from 'redom';
import WorkApi from "../scripts/WorkApi";
import Toast from '../scripts/toast';

export default class YourCurrencies {
  constructor() {
    this.defaultClasses = 'currencies__block bg-white currencies__your your';
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

    setAttr(this.el, {
      className: `${this.defaultClasses} ${this.load ? 'skeleton' : ''}`
    })
  };

  get load() {
    return this._load;
  };

  set data(payload) {
    this._data = Object.values(payload).filter(({ amount }) => !!amount);
    this.render();
    localStorage.setItem('currencies', JSON.stringify(this.data));
  };

  get data() {
    return this._data;
  };

  async fetch() {
    this.load = this.checkLocalStorage();
    try {
      const { payload, error } = await WorkApi.getCurrencyAccounts();
      if (error) {
        throw new Error(error);
      };
      this.data = payload;

    } catch ({ message }) {
      switch (message) {
        case 'Failed to fetch':
          new Toast({
            title: 'Упс, что-то пошло не так',
            text: 'Не удалось получить ответ от сервера',
            theme: 'danger',
            autohide: true,
            interval: 10000,
          });
          break;
        default:
          throw new Error(error);
      }
    } finally {
      this.load = false;
    };
  };

  checkLocalStorage() {
    const localData = JSON.parse(localStorage.getItem('currencies'));
    if (!localData) {
      return true
    };
    this.data = localData;
    return !this.data;
  }

  render() {
    setChildren(this.list, [
      this.data.map(({ amount, code }) =>
        <li class='currency'>
          <span class='currency__name'>{code}</span>
          <span class='currency__amount'>{amount}</span>
        </li>
      )])
  };
};
