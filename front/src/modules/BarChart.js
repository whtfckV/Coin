import { el, setChildren } from 'redom';
import {
  Chart,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

Chart.register(
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
);

Chart.defaults.font.size = 20;
Chart.defaults.font.weight = 700;
Chart.defaults.font.family = 'WorkSans, Arial, Helvetica, sans-serif';
Chart.defaults.elements.bar.backgroundColor = '#116ACC';
Chart.defaults.elements.bar.borderColor = 'transparent';

export default class BarChart {
  constructor(container, transactions, account, balance) {
    this.container = container;
    this.account = account;
    this.balance = balance;
    this.data = this.getData(transactions);
    console.log(this.data);
    this.canvas = el('canvas');
    this.BarChart = new Chart(this.canvas, {
      type: 'bar',
      options: {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false
          }
        }
      },
      data: {
        labels: this.data.slice(6).map(row => row.month),
        datasets: [
          {
            label: 'Динамика баланса',
            data: this.data.slice(6).map(row => row.amount),
          }
        ]
      }
    })
  }

  getData(array) {
    const agoDate = new Date();
    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'нояб', 'дек'];
    const transactionsMap = [];

    array = array.filter(({ date }) => new Date(date).getFullYear() === agoDate.getFullYear())
    let counter = array.length - 1;
    let balanceCounter = this.balance;

    agoDate.setMonth(agoDate.getMonth() + 1);

    for (let i = 0; i < months.length; i++) {
      let amountTransactions = 0;
      let inTransactions = 0;
      let outTransactions = 0;
      agoDate.setMonth(agoDate.getMonth() - 1);

      for (counter; counter >= 0; counter--) {
        const transactionDate = new Date(array[counter].date);
        if (transactionDate.getMonth() === agoDate.getMonth()) {
          const transactionTo = array[counter].to;
          const transactionAmount = array[counter].amount;
          if (transactionTo === this.account) {
            amountTransactions += transactionAmount;
            inTransactions += transactionAmount;
          } else {
            amountTransactions -= transactionAmount;
            outTransactions -= -transactionAmount;
          }
        } else {
          break;
        }
      }
      balanceCounter = balanceCounter - amountTransactions;
      const trans = {
        month: months[agoDate.getMonth()],
        amount: +balanceCounter.toFixed(2),
        in: +inTransactions.toFixed(2),
        out: +outTransactions.toFixed(2),
      };
      transactionsMap.push(trans);
    }

    transactionsMap[0].amount = +this.balance.toFixed(2);
    return transactionsMap.reverse();
  }

  render() {
    setChildren(this.container, this.canvas)
  }
}
