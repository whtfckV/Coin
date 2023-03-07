import './styles/normalize.scss';
import './styles/main.scss';
import './styles/header.scss';
import { el, setChildren } from 'redom';
import Navigo from 'navigo';
import createLoginForm from './modules/login';
import validLoginForm from './modules/validationLoginForm';
import { Header } from './modules/Header';
import TopMenu from './modules/TopMenu';
import CardList from './modules/cardsList';
import Currencies from './modules/Currencies';
import WorkApi from './modules/WorkApi';
import Exchange from './modules/Exchange';
import Strim from './modules/Strim';
import AccountTop from './modules/AccountTop';
import NewTransfer from './modules/newTransfer';
import BarChart from './modules/BarChart';

const router = new Navigo('/');
const PATH = {
  ACCOUNTS: '/accounts',
  ACCOUNT: '/account',
  BANKS: '/banks',
  CURRENCIES: '/currencies',
  CREATE: '/create-account',
};

if (!localStorage.getItem('accounts'))
  localStorage.setItem('accounts', JSON.stringify([]));

if (!localStorage.getItem('token'))
  router.navigate('/');

const container = el('div.container');
const main = el('main.main', container);
const header = new Header();
const top = new TopMenu();
const form = createLoginForm();
const ul = el('ul.list-reset.card-list');
const cards = new CardList(ul);
const content = el('div.content');
const strim = new Strim();


top.select.select.addEventListener('change', () => {
  cards.sortProp = top.select.value;
})
ul.addEventListener('cardsLoaded', () => router.updatePageLinks());

setChildren(document.body, [header.header, main]);
setChildren(container, [top.element, content]);


container.addEventListener('create', () => {
  WorkApi.createAccount()
  cards.fetch().then(() => {
    cards.render();
    router.updatePageLinks();
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const { login, password } = validLoginForm(form);

  if (login && password) {
    WorkApi.autorization(login, password).then(({ payload, error }) => {
      if (payload) {
        localStorage.setItem('token', payload.token);
        router.navigate('/accounts');
        main.classList.remove('fix');
      } else {
        console.log(error);
      };
    });
  }
})


router.on('/', () => {
  if (localStorage.getItem('token'))
    router.navigate('/accounts');

  header.update();
  main.classList.add('fix');
  setChildren(main, form);
}).resolve();

router.on(PATH.ACCOUNTS, ({ url }) => {
  main.classList.remove('fix');
  header.update(url);
  top.update(url);

  setChildren(main, container);
  setChildren(content, ul);

  cards.fetch().then(() => {
    cards.sortProp = localStorage.getItem('sorting');
    router.updatePageLinks();
  })
}).resolve()

router.on(`${PATH.ACCOUNT}/:id`, ({ data: { id }, url }) => {
  header.update(url);
  top.update(url);

  const [
    accountTopContainer,
    newTransferContainer,
    balanceDynamicsContainer,
    transferHistoryContainer,
  ] = [
      el('div.account__top.skeleton'),
      el('div.account__item.account__item_grey.skeleton'),
      el('div.account__item.account__item_white.skeleton'),
      el('div.account__item.account__item_grey.skeleton'),
    ];
  setChildren(content, [
    accountTopContainer,
    newTransferContainer,
    balanceDynamicsContainer,
    transferHistoryContainer,
  ]);


  WorkApi.getAccount(id).then(({ payload: { account, balance, transactions }, error }) => {
    if (error) {
      throw new Error(error);
    };

    // console.table(account, balance, transactions);

    const accountTop = new AccountTop(accountTopContainer, account, balance);
    accountTop.render();

    const newTransfer = new NewTransfer(newTransferContainer, account);
    newTransfer.render();

    const barChart = new BarChart(balanceDynamicsContainer, transactions, account, balance);
    barChart.render();

    newTransfer.form.addEventListener('submit', function (e) {
      e.preventDefault();
      const recipientInp = this.elements['recipient'];
      const amountInp = this.elements['transferAmount'];
      const recipient = recipientInp.value;
      const amount = amountInp.value;

      if (!!amount.trim() && !!recipient.trim()) {
        WorkApi.transferFunds(account, recipient, amount)
          .then(({ payload: { balance }, error }) => {
            if (error) throw new Error(error);

            const accounts = JSON.parse(localStorage.getItem('accounts'));
            if (!accounts.includes(recipient)) accounts.push(recipient);
            localStorage.setItem('accounts', JSON.stringify(accounts));

            accountTop.balance = balance;
            recipientInp.value = '';
            amountInp.value = '';

            NewTransfer.updateOldAccounts();
          })
          .catch(error => console.log(error));
      } else {
        console.log('error, empty');
      }

    })
  }).catch(error => {
    console.log(error);
  });
}).resolve();

router.on(PATH.CURRENCIES, ({ url }) => {
  header.update(url);
  top.update(url);

  const [
    yourCurrencies,
    currenciesStrim,
    currenciesExhange
  ] = [
      el('div.currencies__block.currencies__your.your'),
      el('div.currencies__block.currencies__block_grey.currencies__strim'),
      el('div.currencies__block.currencies__exchange.exchange'),
    ];
  const contentCurrencies = el('div.currencies', [
    yourCurrencies,
    currenciesStrim,
    currenciesExhange,
  ]);
  const currencies = new Currencies(yourCurrencies);
  const exchange = new Exchange(currenciesExhange);

  setChildren(currenciesStrim, strim.render());
  strim.connect();

  content.addEventListener('exchange', ({ detail }) => {
    currencies.data = detail;
  })

  setChildren(content, contentCurrencies);
}, {
  leave(done, match) {
    strim.close();
    done();
  }
}).resolve()

router.on(PATH.BANKS, ({ url }) => {
  setChildren(content, el('p', 'банки'));
  header.update(url)
  top.update(url);
}).resolve();


