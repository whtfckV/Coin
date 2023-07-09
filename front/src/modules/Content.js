import { el, setAttr, setChildren } from 'redom';
import Login from './Login';
import Accounts from './Accounts';

export default class Content {
  constructor() {
    <div this='el' class='content'>
      <Login />
    </div>
  };

  update(url) {
    this.path = url;
    switch (this.path) {
      case 'accounts':
        setAttr(this.el, {
          className: 'content'
        });
        setChildren(this.el, <Accounts />);
        break;
      case '':
        setAttr(this.el, {
          className: 'content content-login'
        });
        setChildren(this.el, <Login />);
        break;
    };
  };
};
