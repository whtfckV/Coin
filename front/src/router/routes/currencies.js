import { el, setChildren } from 'redom';
import Currencies from '../../modules/Currencies';
import Exchange from '../../modules/Exchange';
import Strim from '../../modules/Strim';
import { content } from '../../index.js';

export const strim = new Strim();

export default function currencies() {
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
}
