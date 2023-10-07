import { el, mount, setAttr, setChildren, unmount } from 'redom';
import Login from './Login';
import router from '../router/router';
import TopMenu from './TopMenu';
import CardList from './CardsList';
import WorkApi from './WorkApi';
import AccountInfo from './AccountInfo';
import Currencies from './Currencies';
import getCookie from '../scripts/getCookie';
import Banks from './Banks';

export default class Content {
  constructor() {
    <div this='el' class='content'>
      <TopMenu this='menu' create={this.createAccount} change={this.changeSort} />
      <section this='section'>
        <CardList this='cards' />
      </section>
    </div>
  };

  onmount() {
    if (!getCookie('auth')) {
      router.navigate('/');
    };
  };

  createAccount = async (e) => {
    try {
      const { payload, error } = await WorkApi.createAccount();
      if (error) {
        throw new Error(error);
      };
      this.cards.data = [...this.cards.data, payload];
    } catch (error) {
      console.log(error);
    };
  };

  changeSort = ({ target: { value } }) => {
    this.cards.sortProp = value;
    this.cards.render();
  };

  update(url, data) {
    this.path = url;

    if (data?.id) {
      const detail = this.path.endsWith('detailed-balance');

      setChildren(this.section, <AccountInfo account={data.id} detail={detail} />);
      this.menu.update('back');
    } else {
      this.menu.update('create');
    }

    switch (this.path) {
      case 'accounts':
        setAttr(this.el, {
          className: 'content'
        });
        mount(this.el, this.menu, this.section);
        setChildren(this.section, this.cards);
        break;
      case 'currencies':
        mount(this.el, this.menu, this.section);
        this.menu.update(this.path)
        setChildren(this.section, <Currencies />);
        break;
        case 'banks':
        mount(this.el, this.menu, this.section);
        this.menu.update(this.path)
        setChildren(this.section, <Banks />);
        break;
      case '':
        if (getCookie('auth')) {
          router.navigate('/accounts');
        };
        setAttr(this.el, {
          className: 'content content-login'
        });
        unmount(this.el, this.menu);
        setChildren(this.section, <Login />);
        break;
    };
  };
};
