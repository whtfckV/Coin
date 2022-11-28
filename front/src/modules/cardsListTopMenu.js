import { el, svg } from 'redom';

const icons = {
  create: svg('svg', {
    width: 16,
    height: 16,
    viewBox: '0 0 16 16',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg'
  }, svg('path', {
    d: 'M7.99999 7.69167e-06L8 8.00001M8 8.00001L8.00001 16M8 8.00001L16 8.00001M8 8.00001L0 8',
    stroke: 'white',
    'stroke-width': 2
  }))
}

export default function createTopMenu(title, btnName, icon) {
  const select = el('select#sort', [
    el('option', { value: 'placeholder' }, 'Сортировка'),
    el('option', { value: 'account' }, 'По номеру'),
    el('option', { value: 'balance' }, 'По балансу'),
    el('option', { value: 'date' }, 'По последней транзакции'),
  ]);
  const btn = el('button.btn.btn-l.btn-primary.btn-icon-text.accounts-top__btn', icons[icon], btnName);

  // <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  //   <path d="M7.99999 7.69167e-06L8 8.00001M8 8.00001L8.00001 16M8 8.00001L16 8.00001M8 8.00001L0 8" stroke="white" stroke-width="2"/>
  // </svg>

  return {
    select: select,
    addAccount: btn,
    top: el('div.accounts-top', [
      el('h1.main-title', title),
      select,
      btn
    ]),
  }
}
