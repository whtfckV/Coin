import { el, mount } from "redom";
import { accountContainer } from "../router/routes/account";

export default class AccountInfo {
  static $balance = el('span.balance__amount');
  static $account = el('h2.top-info__title');
  static el = el('div.account__top-info.top-info', [
    this.$account,
    el('.top-info__balance', [
      el('strong.top-info__mame', 'Баланс'),
      this.$balance,
    ])
  ]);

  constructor () {};

  static setState({ account, balance}) {
    this.account = account ?? this.account;
    this.balance = balance;
    this.#update();
  };

  static #update() {
    this.$balance.textContent = `${this.balance} ₽`;
    this.$account.textContent = `№ ${this.account}`;
  }

  static mount() {
    mount(accountContainer, this.el);
  };
};
