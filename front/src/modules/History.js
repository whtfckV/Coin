import { el, mount, setChildren } from 'redom';

export default class History {
  constructor({ account }) {
    this.account = account;
    <div this='el' class='account__history history bg-grey'>
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
    </div>
  };

  set transactions(transactions) {
    this._transactions = transactions;
    this.lastTenTransactions = transactions.reverse().slice(0, 10);
  };

  get transactions() {
    return this._transactions;
  };

  set lastTenTransactions(newLastTenTransactions) {
    this._lastTenTransactions = newLastTenTransactions;
    this.createTable();
  };

  get lastTenTransactions() {
    return this._lastTenTransactions;
  };

  // Создание тела таблицы
  createTable() {
    setChildren(this.tbody, []);
    if (this.lastTenTransactions.length) {
      this.lastTenTransactions
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
