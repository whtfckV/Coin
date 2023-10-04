import { el, setAttr, setChildren } from 'redom';
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
    this.title;
    this.numberOfMonths = 12;
    this.aspectRatio = 6.5;
    this.stacked = false;
    this.scales = {
      x: {
        // sacked: this.stacked,
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
        },
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
          font: {
            weight: 500,
          },
          color: 'black',
          align: 'end',
        }
      }
    };
    <button
      this='el'
      class='account__bar-chart bar-chart bg-white'
      onclick={() => {
        this.detailedBalance?.();
      }}
    >
      <h3 this='subtitle' class='subtitle'>{this.title}</h3>
      <canvas this='canvas'></canvas>
    </button >
  };

  set title(titleName) {
    this._title = titleName;
    setAttr(this.subtitle, {
      textContent: titleName,
    });
  };

  get title() {
    return this._title;
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
      data: this.data,
      options: {
        aspectRatio: this.aspectRatio,
        scales: {
          ...this.scales,
          x: {
            stacked: this.stacked
          },
        },
      },
    })
  };

  createPersonalData(data, months, transactionLastMonths, agoDate) {
    return data;
  };

  createData(array) {
    const agoDate = new Date();
    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июнь', 'июль', 'авг', 'сен', 'окт', 'нояб', 'дек'];
    const transactionLastMonths = array.filter(transaction => {
      const timeLater = new Date();
      const transactionDate = new Date(transaction.date);

      timeLater.setMonth(agoDate.getMonth() - this.numberOfMonths);

      return transactionDate >= timeLater;
    });
    let data = [{
      month: months[agoDate.getMonth()],
      balance: this.balance
    }];

    this.createPersonalData(data, months, transactionLastMonths, agoDate);
  };
};
