import { setChildren, el } from 'redom';
import Card from './Card'
import WorkApi from './WorkApi';
import router from '../router/router';

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

  get data() {
    return this._data;
  };
  /*
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
          .catch(error => setChildren(this.el, <p>{error.message}</p>));
      }
    } else {
      this.fetch()
        .then(() => this.render())
        .catch(error => setChildren(this.el, <p>{error.message}</p>));
    }
  };

  get sortProp() {
    return this._prop;
  };
  */

  set load(bool) {
    this._load = bool;

    console.log(Array(10).fill(<div class='card skeleton'></div>))

    this._load ?
    /*
      ДАННЫЙ КОД ОТОБРАЖАЕТ НА СТРАНИЦЕ ТОЛЬКО ОДНУ КАРТОЧКУ ИЗ СОЗДАННОГО МАССИВА НЕ МОГУ ПОНЯТЬ ПОЧЕМУ
    */
      setChildren(this.el, Array(10).fill(<div class='card skeleton'></div>)) :
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
    setChildren(this.el, this.data.map(card => <Card card={card}/>));
    router.updatePageLinks();
  };

  sort() {
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
