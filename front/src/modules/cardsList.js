import { setChildren, el } from 'redom';
import createCard from './card';
import getData from './getData';

export default class CardList {
  constructor(container) {
    this.container = container;
    this.url = 'http://localhost:3000/accounts';
    this.load = true;
    this.sortProp = localStorage.getItem('sorting') || null;
  }

  set sortProp(prop) {
    this._prop = prop;
    if (this._prop) {
      localStorage.setItem('sorting', this._prop);

      if (this.cards) {
        this.sort()
      } else {
        this.fetch()
          .then(() => {
            this.sort()
          })
          .catch(error => setChildren(this.container, el('p', error.message)));
      }
    } else {
      this.fetch()
        .then(() => this.render())
        .catch(error => setChildren(this.container, el('p', error.message)));
    }
  };

  get sortProp() {
    return this._prop;
  };


  set load(bool) {
    this._load = bool;

    this._load ?
      setChildren(this.container, el('p', 'loading...')) :
      setChildren(this.container, []);
  }

  get load() {
    return this._load;
  }

  async fetch() {
    this.load = true;
    try {
      this.cards = await getData(this.url);
    } catch (error) {
      throw new Error(error);
    } finally {
      this.load = false;
    }
  }

  render() {
    setChildren(this.container, this.cards.map(card => createCard(card)));
  }

  sort() {
    this.cards.sort((cardA, cardB) => {
      if (this.sortProp !== 'date') {
        if (Number(cardA[this.sortProp]) < Number(cardB[this.sortProp]))
          return -1;
      } else {
        if (cardA['transactions'].length && cardB['transactions'].length ?
          cardA['transactions'][0][this.sortProp] < cardB['transactions'][0][this.sortProp] :
          cardA['transactions'].length < cardB['transactions'].length)
          return -1;
      }
    });

    this.render();
  }
};
