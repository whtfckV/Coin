import { setChildren, el, setAttr } from "redom";
import WorkApi from "./WorkApi";

export default class Currencies {
  constructor({ account }) {
    <div this='el' class='currencies'>
    </div>
  };

  onmount() {
    this.fetch();
  };

  set load(bool) {
    this._load = bool;

    this._load ?
      setAttr(this.el, {
        className: 'currencies skeleton'
      }) :
      setAttr(this.el, {
        className: 'currencies'
      });
  }

  get load() {
    return this._load;
  }

  set data(d) {
    this._data = d;
    this.render();
  }
  get data() {
    return this._data
  }

  async fetch() {
    this.load = true;
    try {
      const { payload, error } = await WorkApi.getCurrencyAccounts();
      this.data = payload;
      if (error) {
        throw new Error(error)
      } else {
        this.data = payload;
      }

    } catch (error) {
      throw new Error(error);
    } finally {
      this.load = false;
    }
  }

  render() {
    const values = Object.values(this.data);
    setChildren(this.el, [
      el('h3.currencies__title', 'Ваши валюты'),
      el('ul.your__list', [
        values.map(({ amount, code }) => amount ? el('li.currency', [
          el('span.currency__name', code),
          el('span.currency__amount', amount),
        ]) : '')
      ])
    ])
  }
}
