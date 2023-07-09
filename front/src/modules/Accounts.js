import { el } from 'redom';
import TopMenu from './TopMenu';
import CardList from './CardsList';
import WorkApi from './WorkApi';
import router from '../router/router';

export default class Accounts {
  constructor() {
    <div this='el'>
      <TopMenu create={this.createAccount} />
      <CardList this='cards' />
    </div>
  };

  // onmount() {
  //   console.log(this)
  // }

  createAccount = () => {
    WorkApi.createAccount().then(res => {
      this.cards.data = res;
    });
    this.cards.fetch().then(() => {
      this.cards.render();
    });
  }
};
