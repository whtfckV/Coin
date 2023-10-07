import BarChart from "./BarChart";

export default class BarChartRation extends BarChart {
  constructor({ account }) {
    super({ account });
    this.title = 'Соотношение входящих исходящих транзакций';
    this.stacked = true;
  };

  createPersonalData(months, transactionLastMonths, agoDate) {
    const data = [];
    for (let i = 0; i < 12; i++) {
      let positiveTransaction = 0;
      let negativeTransaction = 0;
      const transactionPerMonth = transactionLastMonths.filter(transaction => new Date(transaction.date).getMonth() === agoDate.getMonth());

      if (transactionPerMonth.length) {
        transactionPerMonth.forEach(transaction => transaction.to === this.account ?
          positiveTransaction += transaction.amount :
          negativeTransaction += transaction.amount
        );
      };
      data.push({
        month: months.at(agoDate.getMonth()),
        positiveTransaction: +positiveTransaction.toFixed(2),
        negativeTransaction: +negativeTransaction.toFixed(2),
      });

      agoDate.setMonth(agoDate.getMonth() - 1);
    };

    data.reverse();
    this.data = {
      labels: data.map(row => row.month),
      datasets: [
        {
          data: data.map(row => row.positiveTransaction),
          backgroundColor: '#76CA66'
        },
        {
          data: data.map(row => row.negativeTransaction),
          backgroundColor: '#FD4E5D'
        },
      ],
    };
  };
};
