import { setChildren, el } from "redom";

export default class AccountTop {
  constructor(container, account, balance) {
    this.container = container;
    this.account = account;
    this.$balance = el('span.balance');
    this.balance = balance;
  }

  set balance(amount) {
    this._balance = amount;
    this.$balance.textContent = this.balance;
  };

  get balance() {
    return this._balance;
  };

  render() {

    setChildren(this.container, [
      el('h2.account__title', `№ ${this.account}`),
      el('strong', 'Баланс'),
      this.$balance,
    ])
    this.container.classList.remove('skeleton');
  }
}
