import { el, setChildren } from 'redom';
import Login from './Login';
import CardList from './CardsList';
import router from '../router/router';
import Accounts from './Accounts';

export default class Content {
  constructor() {
    <div this='el' class='content'>
      <Login />
    </div>
  };

  update(url) {
    this.path = url;
    console.log(url)
    // debugger;
    switch (this.path) {
      case 'accounts':
        setChildren(this.el, <Accounts />);
        break;
      case '':
        setChildren(this.el, <Login />);
        break;
    }
  }

};
