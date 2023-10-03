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


export default class BarChart {
  constructor({ account }) {
    this.account = account;
    <div this='el' class='account__bar-chart bar-chart bg-white'>
      <h3 class='subtitle'>Динамика баланса</h3>
      <canvas this='canvas'></canvas>
    </div>
  };

  set balance(amount) {
    this._balance = amount;
  };

  get balance() {
    return this._balance;
  };

  set transactions(data) {
    this._transactions = data;
    this.createBar();
  };

  get transactions() {
    return this._transactions;
  };

  createBar() {
    this.createData(this.transactions);
    this.BarChart = new Chart(this.canvas, {
      type: 'bar',
      data: {
        labels: this.data.map(row => row.month),
        datasets: [
          {
            data: this.data.map(row => row.balance),
          }
        ]
      },
      options: {
        scales: {
          x: {
            border: {
              color: 'black',
            },
            grid: {
              color: 'black',
              borderColor: 'white',
            },
            ticks: {
              // maxTicksLimit: 2,
              color: 'black',
            }
          },
          y: {
            bounds: 'data',
            border: {
              color: 'black'
            },
            grid: {
              color: 'black',
              borderColor: 'white',
            },
            ticks: {
              maxTicksLimit: 2,
              // mirror: true,
              font: {
                weight: 500,
              },
              color: 'black',
              align: 'end',
            }
          }
        },
        plugins: {
        },
      },
    })
  };

  createData(array) {
    const agoDate = new Date();
    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июнь', 'июль', 'авг', 'сен', 'окт', 'нояб', 'дек'];
    const transactionLastSixMonths = array.filter(transaction => {
      const sixMonthAgo = new Date();
      const transactionDate = new Date(transaction.date);

      sixMonthAgo.setMonth(agoDate.getMonth() - 6);

      return transactionDate.getMonth() > sixMonthAgo.getMonth() && transactionDate.getFullYear() >= sixMonthAgo.getFullYear();
    });
    const data = [{
      month: months[agoDate.getMonth()],
      balance: this.balance
    }];

    let balanceCounter = this.balance;

    for (let i = 0; i < 5; i++) {
      const transactionPerMonth = transactionLastSixMonths.filter(transaction => new Date(transaction.date).getMonth() === agoDate.getMonth());

      if (transactionPerMonth.length) {
        transactionPerMonth.forEach(transaction => transaction.to === this.account ?
          balanceCounter -= transaction.amount :
          balanceCounter += transaction.amount
        );
      };
      data.push({
        month: months[agoDate.getMonth() - 1],
        balance: balanceCounter.toFixed(2),
      });

      agoDate.setMonth(agoDate.getMonth() - 1);
    };

    this.data = data.reverse();
  };
};
