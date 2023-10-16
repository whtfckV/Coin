import { el, mount, setAttr, setChildren } from 'redom';

export default class History {
  constructor({ account, detailedBalance, detail }) {
    this.account = account;
    this.detail = detail;
    this.count = 0;
    this.defaultClasses = 'account__history history bg-grey';
    <button this='el' class={this.defaultClasses} onclick={() => { detailedBalance() }}>
      <table class='history__table history-table'>
        <caption class='history__title subtitle'>История переводов</caption>
        <thead class='history-table__head'>
          <tr>
            <th>Счёт отправителя</th>
            <th>Счёт получателя</th>
            <th>Сумма</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody this='tbody' class='history-table__body'>

        </tbody>
      </table>
      <div this='target'></div>
    </button>
  };

  onmount() {
    if (this.detail) {
      this.observer = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting && !this.load) {
          this.renderRows();
        }
      }, {
        threshold: 1,
      });
      this.observer.observe(this.target);
    };
  };

  onunmount() {
    if (this.detail) {
      this.observer.unobserve(this.target);
    };
  };

  set load(bool) {
    this._load = bool;
    setAttr(this.el, {
      className: `${this.defaultClasses} ${this.load ? 'skeleton' : ''}`,
    });
  };

  get load() {
    return this._load;
  };

  set transactions(transactions) {
    this._transactions = transactions;
    this.lastTransactions = transactions.reverse().slice(0, this.detail ? undefined : 10);
  };

  get transactions() {
    return this._transactions;
  };

  set lastTransactions(newLastTransactions) {
    this._lastTransactions = newLastTransactions;
    this.createTable();
  };

  get lastTransactions() {
    return this._lastTransactions;
  };

  // Создание тела таблицы
  createTable() {
    setChildren(this.tbody, []);

    if (this.lastTransactions.length && !this.detail) {
      this.renderRows();
    } else if (!this.lastTransactions.length) {
      mount(this.tbody, <tr>
        <th colspan='4'>История переводов пуста</th>
      </tr>);
    };
  };

  renderRows() {
    // debugger;
    if (this.count < this.lastTransactions.length) {
      this.lastTransactions.slice(this.count, this.count += 25)
        .map(({ date, from, to, amount }, i) => {
          mount(this.tbody, <tr>
            <td>{from}</td>
            <td>{to}</td>
            <td class={
              `${this.incoming(from) ?
                'outgoing' :
                'incoming'
              }`}
              data-test={i === 0 ? 'lastTransaction' : ''}
            >{`${this.incoming(from) ?
              '-' :
              '+'
              } ${amount} ₽`}</td>
            <td>{this.convertDate(date)}</td>
          </tr>);
        });
    };
    !this.detail ? this.count = 0 : '';
  };

  // Возвращает поступление это или нет
  incoming(sender) {
    return this.account === sender;
  };

  // Конвертация даты в нужный формат
  convertDate(transactionDate) {
    const date = new Date(transactionDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${date.getFullYear()}`
  };
};
