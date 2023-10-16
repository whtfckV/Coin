import { el, mount, setAttr, setChildren, unmount } from 'redom';
import Login from './Login';
import router from '../router/router';
import TopMenu from './TopMenu';
import CardList from './CardsList';
import WorkApi from '../scripts/WorkApi';
import AccountInfo from './AccountInfo';
import Currencies from './Currencies';
import getCookie from '../scripts/getCookie';
import Banks from './Banks';
import Toast from '../scripts/toast';

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
    let btn;
    if (e.target instanceof HTMLButtonElement) {
      btn = e.target;
    } else {
      btn = e.target.parentElement;
    };


    try {
      setAttr(btn, {
        disabled: true
      });

      const { payload, error } = await WorkApi.createAccount();
      if (error) {
        throw new Error(error)
      };

      this.cards.data = [...this.cards.data, payload];
    } catch (error) {
      new Toast({
        title: 'Упс, что-то пошло не так',
        text: 'Не удалось получить ответ от сервера',
        theme: 'danger',
        autohide: true,
        interval: 10000,
      });
    } finally {
      setAttr(btn, {
        disabled: false
      });
    };
  };

  changeSort = ({ target: { value } }) => {
    this.cards.sortProp = value;
    this.cards.render();
  };

  update(url, data) {
    this.path = url;

    // console.log(+data.id)

    if (!isNaN(+data?.id)) {
      const detail = this.path.endsWith('detailed-balance');

      setChildren(this.section, <AccountInfo account={data.id} detail={detail} />);
      this.menu.update('back');
    } else {
      this.menu.update('create');
    }

    switch (this.path) {
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
    };
  };
};
