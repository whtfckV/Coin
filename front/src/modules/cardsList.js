import { setChildren, el } from 'redom';
import { content } from '..';
import createCard from '../scripts/card';
import WorkApi from './WorkApi';
import router from '../router/router';

export default class CardList {
  constructor() {
    <ul this='el' class='list-reset card-list'></ul>
    this.load;
    this.fetch().then(() => {
      this.sortProp = localStorage.getItem('sorting');
      router.updatePageLinks();
    });
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
          .catch(error => setChildren(this.el, el('p', error.message)));
      }
    } else {
      this.fetch()
        .then(() => this.render())
        .catch(error => setChildren(this.el, el('p', error.message)));
    }
  };

  get sortProp() {
    return this._prop;
  };


  set load(bool) {
    this._load = bool;

    this._load ?
      setChildren(this.el, [
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
      setChildren(this.el, []);
  };

  get load() {
    return this._load;
  };

  async fetch() {
    this.load = true;
    try {
      const { payload, error } = await WorkApi.getAccounts();

      if (error) {
        throw new Error(error);
      };
      this.cards = payload;
    } catch (error) {
      throw new Error(error);
    } finally {
      this.load = false;
    };
  };

  render() {
    setChildren(this.el, this.cards.map(card => createCard(card)));
  };

  sort() {
    this.cards.sort((cardA, cardB) => {
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

    this.render();
  };
};
