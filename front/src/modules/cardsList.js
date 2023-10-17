import { setChildren, el } from 'redom';
import Card from './Card'
import WorkApi from '../scripts/WorkApi';
import Toast from '../scripts/toast';

export default class CardList {
  constructor() {
    this.load;
    this.sortProp = localStorage.getItem('sorting');
    <ul this='el' class='list-reset card-list'></ul>
  };

  set data(prop) {
    this._data = prop;
    this.sort();
    this.render();
    localStorage.setItem('accounts', JSON.stringify(this.data));
  };

  get data() {
    return this._data;
  };

  set sortProp(newSortProp) {
    this._sortProp = newSortProp;
    localStorage.setItem('sorting', newSortProp);
    this.sort();
  };

  get sortProp() {
    return this._sortProp;
  };

  set load(bool) {
    this._load = bool;

    this._load ?
      setChildren(this.el, [
        <div class='card skeleton'></div>,
        <div class='card skeleton'></div>,
        <div class='card skeleton'></div>,
        <div class='card skeleton'></div>,
        <div class='card skeleton'></div>,
        <div class='card skeleton'></div>,
        <div class='card skeleton'></div>,
        <div class='card skeleton'></div>,
        <div class='card skeleton'></div>,
      ]) :
      null;
  };

  get load() {
    return this._load;
  };

  onmount() {
    this.fetch();
  };

  async fetch() {
    this.load = this.checkLocalStorage();
    try {
      const { payload, error } = await WorkApi.getAccounts();

      if (error) {
        throw new Error(error);
      };
      this.data = payload;
    } catch ({ message }) {
      setChildren(this.el, [])
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
          new Toast({
            title: 'Ошибка',
            text: 'Произошла ошибка, попробуйте обновить страницу позже',
            theme: 'danger',
            autohide: true,
            interval: 10000,
          });
          break;
      };
    } finally {
      this.load = false;
    };
  };

  checkLocalStorage() {
    const localData = JSON.parse(localStorage.getItem('accounts'));
    if (!localData) {
      return true
    };
    this.data = localData;
    return !this.data;
  };

  render() {
    setChildren(this.el, this.data.map(card => <Card card={card} />));
  };

  sort() {
    if (!this.data) return;

    this.data.sort((cardA, cardB) => {
      if (this.sortProp !== 'date') {
        if (Number(cardA[this.sortProp]) < Number(cardB[this.sortProp]))
          return -1;
      } else {
        if (cardA['transactions'].length && cardB['transactions'].length ?
          cardA['transactions'][0][this.sortProp] < cardB['transactions'][0][this.sortProp] :
          cardA['transactions'].length < cardB['transactions'].length);
        return -1;
      };
    });
  };
};
