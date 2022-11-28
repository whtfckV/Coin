import './styles/normalize.scss';
import './styles/main.scss';
import './styles/header.scss';
import { el, setChildren } from 'redom';
import Navigo from 'navigo';
import customSelect from 'custom-select';
import createLoginForm from './modules/login';
import validLoginForm from './modules/validationLoginForm';
import { Header } from './modules/header';
import createTopMenu from './modules/cardsListTopMenu';
import getData from './modules/getData';
import CardList from './modules/cardsList';

const router = new Navigo('/');
const URL_API = 'http://localhost:3000';
const PATH = {
  ACCOUNTS: 'accounts',
  ACCOUNT: 'account',
  BANKS: 'banks',
  CURRENCIES: 'currencies',
  CREATE: 'create-account',
};

const main = el('main.main');
const header = new Header();
const form = createLoginForm();

// if (!localStorage.getItem('token')) {
//   router.navigate('/');
// }

form.addEventListener('submit', e => {
  e.preventDefault();

  const { login, password } = validLoginForm(form);

  if (login && password) {
    fetch(`${URL_API}/login`, {
      method: 'post',
      body: JSON.stringify({
        login: login,
        password: password
      }),
      headers: {
        'Content-Type': 'Application/json'
      }
    })
      .then(res => res.json())
      .then(({ payload, error }) => {
        if (payload) {
          localStorage.setItem('token', payload.token);
          router.navigate('accounts');
          main.classList.remove('fix');
        } else {
          console.log(error)
        }
      });
  }
})

setChildren(document.body, [header.header, main]);

router.on('/', () => {
  if (localStorage.getItem('token')) {
    router.navigate('accounts');
  };

  main.classList.add('fix');
  setChildren(main, form);
});

const { top, select, addAccount } = createTopMenu('Ваши счета', 'Создать новый счет', 'create');
const cstSel = customSelect(select)[0];

router.on(PATH.ACCOUNTS, () => {
  main.classList.remove('fix');
  header.update(PATH.ACCOUNTS);

  const ul = el('ul.list-reset.card-list')
  const container = el('div.container', [
    top,
    ul
  ]);
  const cards = new CardList(ul);

  cstSel.value = localStorage.getItem('sorting') ?? '';

  cstSel.select.addEventListener('change', () => {
    cards.sortProp = cstSel.value;
  });

  addAccount.addEventListener('click', () => {
    getData(URL_API, PATH.CREATE);
    cards.fetch().then(() => cards.render());
  });

  setChildren(main, container);
})

router.on(`account/:id`, (data) => {
  header.update();
  console.log(`%c${data}`, 'color: coral; font-size: 16px');
  setChildren(main, el('p', id))
})

router.on(PATH.BANKS, () => {
  header.update(PATH.BANKS)
  setChildren(main, el('p', 'банки'))
})

router.on(PATH.CURRENCIES, () => {
  header.update(PATH.CURRENCIES)
  setChildren(main, el('p', 'валюты'))
})

router.resolve();


