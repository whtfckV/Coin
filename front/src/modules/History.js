import { el, mount, setChildren } from 'redom';

export default class History {
  constructor({ account, detailedBalance, detail }) {
    this.account = account;
    this.numberOfTransactions = detail ? 25 : 10;
    <button this='el' class='account__history history bg-grey' onclick={() => { detailedBalance() }}>
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
    </button>
  };

  set transactions(transactions) {
    this._transactions = transactions;
    this.lastTransactions = transactions.reverse().slice(0, this.numberOfTransactions);
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
    if (this.lastTransactions.length) {
      this.lastTransactions
        .map(({ date, from, to, amount }) => {
          mount(this.tbody, <tr>
            <td>{from}</td>
            <td>{to}</td>
            <td class={
              `${this.incoming(from) ?
                'incoming' :
                'outgoing'
              }`}
            >{`${this.incoming(from) ?
              '-' :
              '+'
              } ${amount} ₽`}</td>
            <td>{this.convertDate(date)}</td>
          </tr>)
        });
    } else {
      mount(this.tbody, <tr>
        <th colspan='4'>История переводов пуста</th>
      </tr>);
    };
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
