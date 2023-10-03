import { el, mount } from "redom";
import AccountTitle from "./AccountTitle";
import AccountBalance from "./AccountBalance";
import WorkApi from "./WorkApi";
import Transfer from "./Transfer";
import History from "./History";
import BarChart from "./BarChart";

export default class AccountInfo {
  constructor({ account }) {
    this.load;
    this.account = account;
    <div this='el' class='account'>
      <AccountTitle account={this.account} />
      <AccountBalance this='balance' />
      <Transfer account={account} updateBalance={this.updateBalance.bind(this)} updateHistory={this.updateHistory.bind(this)} />
      <BarChart this='barChart' account={account} />
      <History this='history' account={account} />
    </div>
  };

  set load(bool) {
    this._load = bool;
    this.balance.load = this.load;
  };

  get load() {
    return this._load;
  };

  onmount() {
    this.fetch();
  };

  // Обновление баланса
  updateBalance(newData) {
    this.balance.data = newData;
  };

  // Обновление истории переводов
  updateHistory(newTransaction) {
    this.history.lastTenTransactions = [
      newTransaction,
      ...this.history.lastTenTransactions,
    ].slice(0, 10);
  };

  // Запрос данных
  async fetch() {
    this.load = true;
    try {
      const { payload: { account, balance, transactions }, error } = await WorkApi.getAccount(this.account);
      if (error) {
        throw new Error(error);
      };

      // добавление данных в компаненты
      this.balance.data = balance;
      this.history.transactions = transactions;
      this.barChart.balance = balance;
      this.barChart.transactions = transactions;
    } catch (error) {
      console.error(error);
    } finally {
      this.load = false;
    };
  };
};
