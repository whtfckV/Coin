import { describe, expect, test } from '@jest/globals';
import AccountBalance from '../src/modules/AccountBalance';

describe('Тест компонента AccountBalane', () => {
  const balance = <AccountBalance />;

  test('AccountBalane является div элементом', () => {
    expect(balance.el).toBeInstanceOf(HTMLDivElement);
  });

  test('AccountBalane содержит внутри два DOM элемента', () => {
    expect(balance.el.children.length).toBe(2);
  });

  test('Во время загрузки добавляется класс skeleton', () => {
    balance.load = true;
    expect(balance.el.classList.toString()).toEqual(expect.stringContaining('skeleton'));
  });

  test('После загрузки удаляется класс skeleton', () => {
    balance.load = false;
    expect(balance.el.classList.toString()).not.toEqual(expect.stringContaining('skeleton'));
  });

  test('При при изменении данных изменяется содержимое элемента', () => {
    balance.data = 12345;
    expect(balance.el.querySelector('[data-test=balance]').textContent).toBe('12345 ₽');

    balance.data = 54321;
    expect(balance.el.querySelector('[data-test=balance]').textContent).toBe('54321 ₽');
  });
});
