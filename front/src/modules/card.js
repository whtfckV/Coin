import { el, html } from "redom";

const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
]

export default function createCard({ account, balance, transactions }) {
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
  return el('li.card.card-list__item', [
    el('span.card__amount', account),
    el('div.card__content', [
      el('div.card__content_left', [
        html('span.card__balance', `${balance} ₽`),
        el('div.card__last-transaction', [
          el('span.card__last-transaction-descr', 'Последняя транзакция:'),
          el('span.card__last-transaction-date', transactions.map(({date}) => {
            date = new Date(date);
            return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
          }))
        ]),
      ]),
      // поправить падинги по x
      el('a.btn.btn-l.btn-primary.card__btn', {
        href: `account/${account}`,
        'data-navigo': ''
      }, 'Открыть'),
    ]),
  ])
}
