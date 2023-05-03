import { el, setChildren } from 'redom';
import Login from './Login';
import CardList from './CardsList';

export default class Content {
  constructor() {
    <div this='el' class='content'>
      <Login />
    </div>
    // debugger;
  };

  update(url) {
    this.path = url;
  }

};
