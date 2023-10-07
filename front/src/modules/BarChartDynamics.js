import BarChart from "./BarChart";

export default class BarChartDynamics extends BarChart {
  constructor({ account, detailedBalance, detail }) {
    super({ account });
    this.title = 'Динамика баланса';
    this.numberOfMonths = detail ? 12 : 6;
    this.aspectRatio = detail ? 6.5 : 3.2;
    this.detailedBalance = detailedBalance;
    this.maxTicksLimit = 2;
  };

  createPersonalData(months, transactionLastMonths, agoDate ) {
    let data = [{
      month: months[agoDate.getMonth()],
      balance: this.balance
    }];
    let balanceCounter = this.balance;

    for (let i = 0; i < this.numberOfMonths - 1; i++) {
      const transactionPerMonth = transactionLastMonths.filter(transaction => new Date(transaction.date).getMonth() === agoDate.getMonth());

      if (transactionPerMonth.length) {
        transactionPerMonth.forEach(transaction => transaction.to === this.account ?
          balanceCounter -= transaction.amount :
          balanceCounter += transaction.amount
        );
      };
      data.push({
        month: months.at(agoDate.getMonth() - 1),
        balance: +balanceCounter.toFixed(2),
      });

      agoDate.setMonth(agoDate.getMonth() - 1);
    };

    data.reverse();
    this.data = {
      labels: data.map(row => row.month),
      datasets: [
        {
          data: data.map(row => row.balance),
        },
      ],
    };
  };
};
