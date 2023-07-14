import { setChildren, el } from 'redom';
import Card from './Card'
import WorkApi from './WorkApi';

export default class CardList {
  constructor() {
    <ul this='el' class='list-reset card-list'></ul>
    this.load;
    this.sortProp = localStorage.getItem('sorting');
  };

  set data(prop) {
    this._data = prop;
    this.sort();
    this.render();
  };

  set sortProp(newSortProp) {
    this._sortProp = newSortProp;
    localStorage.setItem('sorting', newSortProp);
    this.sort();
  };

  get sortProp() {
    return this._sortProp;
  };

  get data() {
    return this._data;
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
    this.load = true;
    try {
      const { payload, error } = await WorkApi.getAccounts();

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
