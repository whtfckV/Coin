import { el, mount } from "redom";
import AccountTitle from "./AccountTitle";
import AccountBalance from "./AccountBalance";
import WorkApi from "./WorkApi";
import Transfer from "./Transfer";

export default class AccountInfo {
  constructor({ account }) {
    <div this='el' class='account'>
      <div class='account__top-info top-info'>
        <AccountTitle account={account} />
        <AccountBalance this='balance' />
      </div>
      <Transfer />
    </div>
    this.account = account;
    this.load;
  };

  set load(bool) {
    this._load = bool;
    this.balance.load = this.load;
  };

  get load() {
    return this._load;
  };

  onmount() {
    this.getData();
  };

  async getData() {
    this.load = true;
    try {
      const { payload: { account, balance, transactions }, error } = await WorkApi.getAccount(this.account);
      if (error) {
        throw new Error(error);
      };

      this.balance.data = balance;
    } catch (error) {
      console.error(error);
    } finally {
      this.load = false;
    };
    // WorkApi.getAccount(this.account).then(({ payload: { account, balance, transactions }, error }) => {
    //   if (error) {
    //     throw new Error(error);
    //   };

    //   this.balance.data = balance;
    //   // accountContainer.classList.remove('skeleton');
    //   // AccountInfo.setState({ account, balance });
    //   // Transfer.setState({ account })


    //   // const barChart = new BarChart(balanceDynamicsContainer, transactions, account, balance);
    //   // barChart.render();

    //   // newTransfer.form.addEventListener('submit', function (e) {
    //   //   e.preventDefault();
    //   //   const recipientInp = this.elements['recipient'];
    //   //   const amountInp = this.elements['transferAmount'];
    //   //   const recipient = recipientInp.value;
    //   //   const amount = amountInp.value;

    //   //   if (!!amount.trim() && !!recipient.trim()) {
    //   //     WorkApi.transferFunds(account, recipient, amount)
    //   //       .then(({ payload: { balance }, error }) => {
    //   //         if (error) throw new Error(error);

    //   //         const accounts = JSON.parse(localStorage.getItem('accounts'));
    //   //         if (!accounts.includes(recipient)) accounts.push(recipient);
    //   //         localStorage.setItem('accounts', JSON.stringify(accounts));

    //   //         accountTop.balance = balance;
    //   //         recipientInp.value = '';
    //   //         amountInp.value = '';

    //   //         NewTransfer.updateOldAccounts();
    //   //       })
    //   //       .catch(error => console.log(error));
    //   //   } else {
    //   //     console.log('error, empty');
    //   //   }

    //   // })
    // }).catch(error => {
    //   console.log(error);
    // });
  }
};
