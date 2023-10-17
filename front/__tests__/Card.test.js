import { describe, expect, test } from '@jest/globals';
import Card from '../src/modules/Card';

describe('Тест компонента Card', () => {
  const cardData = {
    account: 123456890,
    balance: 12345,
    transactions: {
      date: new Date
    },
  };
  const card = <Card card={cardData} />;

  test('Card является элементом списка', () => {
    expect(card.el).toBeInstanceOf(HTMLLIElement);
  });

  test('Номер счета находится на месте', () => {
    expect(card.el.querySelector('[data-test=account]').textContent).toBe(cardData.account);
  });

});
