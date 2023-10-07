import { el, mount, unmount } from "redom";
import AccountTitle from "./AccountTitle";
import AccountBalance from "./AccountBalance";
import WorkApi from "./WorkApi";
import Transfer from "./Transfer";
import History from "./History";
import BarChart from "./BarChart";
import router from '../router/router';
import BarChartDynamics from "./BarChartDynamics";
import BarChartRation from "./BarChartRation";

export default class AccountInfo {
  constructor({ account, detail }) {
    this.load;
    this.account = account;
    this.detail = detail;
    <div this='el' class={`account ${detail ? 'detail' : ''}`}>
      <AccountTitle account={this.account} />
      <AccountBalance this='balance' />
      {!detail &&
        <Transfer this='transfer' account={account} updateInformation={this.updateInformation.bind(this)} />}
      <BarChartDynamics this='barChartDynamics' account={account} detailedBalance={this.goToDetail} detail={detail} />
      {detail && <BarChartRation this='barChartRation' account={account} />}
      <History this='history' account={account} detailedBalance={this.goToDetail} detail={detail} />
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
    // console.log(this.detail)
    this.fetch();
  };

  // переход на к детальной информации счета
  goToDetail = () => {
    router.navigate(`/account/${this.account}/detailed-balance`);
  };

  update() {
    unmount(this.transfer)
  }

  // Обновление информации
  updateInformation({ balance, lastTransaction, allTransactions }) {
    this.balance.data = balance;
    this.history.lastTransactions = [
      lastTransaction,
      ...this.history.lastTransactions,
    ].slice(0, 10);
    this.barChartDynamics.update(balance);
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
      this.barChartDynamics.balance = balance;
      this.barChartDynamics.transactions = transactions;
      if (this.detail) {
        this.barChartRation.balance = balance;
        this.barChartRation.transactions = transactions;
      };
    } catch (error) {
      console.error(error);
    } finally {
      this.load = false;
    };
  };
};
