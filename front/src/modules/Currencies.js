import { setChildren, el } from "redom";
import WorkApi from "./WorkApi";

export default class Currencies {
  constructor(container) {
    this.container = container;

    this.fetch();
  }

  set load(bool) {
    this._load = bool;

    this._load ?
      this.container.classList.add('skeleton') :
      this.container.classList.remove('skeleton');
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
    setChildren(this.container, [
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
