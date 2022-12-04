import { setChildren, el } from 'redom';
import createCard from './card';
import WorkApi from './WorkApi';

export default class CardList {
  constructor(container) {
    this.container = container;
    this.load = true;
    this.sortProp;
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
      setChildren(this.container, [
        el('div.card.skeleton'),
        el('div.card.skeleton'),
        el('div.card.skeleton'),
        el('div.card.skeleton'),
        el('div.card.skeleton'),
        el('div.card.skeleton'),
        el('div.card.skeleton'),
        el('div.card.skeleton'),
        el('div.card.skeleton'),
      ]) :
      setChildren(this.container, []);
  }

  get load() {
    return this._load;
  }

  async fetch() {
    this.load = true;
    try {
      const { payload, error } = await WorkApi.getAccounts();

      if (error) {
        throw new Error(error)
      } else {
        this.cards = payload;
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      this.load = false;
    }
  }

  render() {
    setChildren(this.container, this.cards.map(card => createCard(card)));
    this.container.dispatchEvent(new Event('cardsLoaded', {
      bubbles: true
    }));
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
