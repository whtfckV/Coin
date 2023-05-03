import { el, setChildren } from 'redom';
import WorkApi from '../../modules/WorkApi';
import AccountInfo from '../../modules/AccountInfo';
import Transfer from '../../modules/Transfer';
import BarChart from '../../modules/BarChart';
import { content } from '../../index.js';

export const accountContainer = el('.account.skeleton');

export default function account({ data: { id } }) {
  setChildren(content, accountContainer);
  AccountInfo.mount();
  Transfer.mount();

  WorkApi.getAccount(id).then(({ payload: { account, balance, transactions }, error }) => {
    if (error) {
      throw new Error(error);
    };
    accountContainer.classList.remove('skeleton');
    AccountInfo.setState({ account, balance });
    Transfer.setState({account})


    // const barChart = new BarChart(balanceDynamicsContainer, transactions, account, balance);
    // barChart.render();

    // newTransfer.form.addEventListener('submit', function (e) {
    //   e.preventDefault();
    //   const recipientInp = this.elements['recipient'];
    //   const amountInp = this.elements['transferAmount'];
    //   const recipient = recipientInp.value;
    //   const amount = amountInp.value;

    //   if (!!amount.trim() && !!recipient.trim()) {
    //     WorkApi.transferFunds(account, recipient, amount)
    //       .then(({ payload: { balance }, error }) => {
    //         if (error) throw new Error(error);

    //         const accounts = JSON.parse(localStorage.getItem('accounts'));
    //         if (!accounts.includes(recipient)) accounts.push(recipient);
    //         localStorage.setItem('accounts', JSON.stringify(accounts));

    //         accountTop.balance = balance;
    //         recipientInp.value = '';
    //         amountInp.value = '';

    //         NewTransfer.updateOldAccounts();
    //       })
    //       .catch(error => console.log(error));
    //   } else {
    //     console.log('error, empty');
    //   }

    // })
  }).catch(error => {
    console.log(error);
  });

}
