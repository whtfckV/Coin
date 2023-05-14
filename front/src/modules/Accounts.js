import { el } from 'redom';
import TopMenu from './TopMenu';
import CardList from './CardsList';

export default class Accounts {
  constructor() {
    <div this='el'>
      <TopMenu />
      <CardList />
    </div>
  }
}
