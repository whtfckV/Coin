import { el, mount, setAttr, setChildren, unmount } from 'redom';
import Login from './Login';
import router from '../router/router';
import TopMenu from './TopMenu';
import CardList from './CardsList';
import WorkApi from './WorkApi';
import AccountInfo from './AccountInfo';

export default class Content {
  constructor() {
    <div this='el' class='content'>
      <TopMenu this='menu' create={this.createAccount} change={this.changeSort} />
      <section this='section'></section>
    </div>
    this.cards = <CardList />;
  };

  onmount() {
    if (!localStorage.getItem('token')) {
      router.navigate('/');
    };
  };

  createAccount = () => {
    WorkApi.createAccount().then(res => {
      this.cards.data = res;
    });
    this.cards.fetch().then(() => {
      this.cards.render();
    });
  };

  changeSort = ({ target: { value } }) => {
    this.cards.sortProp = value;
    this.cards.render();
  };

  update(url, data) {
    const reg = new RegExp(/account\/\d{26}/);
    this.path = url;

    if (reg.test(url)) {
      setChildren(this.section, <AccountInfo account={data.id} />);
      this.menu.changeButton('back');
    } else {
      this.menu.changeButton('create');
    }

    switch (this.path) {
      case 'accounts':
        setAttr(this.el, {
          className: 'content'
        });
        mount(this.el, this.menu, this.section);
        setChildren(this.section, this.cards);
        break;
      case '':
        setAttr(this.el, {
          className: 'content content-login'
        });
        unmount(this.el, this.menu);
        setChildren(this.section, <Login />);
        break;
    };
  };
};
