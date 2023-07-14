import { el } from 'redom';
import createFormattedDate from '../scripts/createFormattedDate';
import router from '../router/router';

/*
account: "74213041477477406320783754"
balance: 2991941.51
mine: true
transactions: [
  {
    amount: 413.6
    date: "2022-11-27T04:53:50.402Z"
    from: "13143505735215428837203385"
    to: "74213041477477406320783754"
  }
]
*/

export default class Card {
  constructor({ card: { account, balance, transactions } }) {
    <li this='el' class='card card-list__item'>
      <span class='card__amount'>{account}</span>
      <span class='card__balance'>{`${balance} ₽`}</span>
      <div class='card__content'>
        <div class='card__content_left'>
          <div class='card__last-transaction'>
            <span class='card__last-transaction-descr'>Последняя транзакция</span>
            <span class='card__last-transaction-date'>{transactions.map(createFormattedDate)}</span>
          </div>
        </div>
        <a onclick={() => {router.navigate(`/account/${account}`)}} class='btn btn-l btn-primary card__btn'>Открыть</a>
      </div>
    </li>
  };
};
