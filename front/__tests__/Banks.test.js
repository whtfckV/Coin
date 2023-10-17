import { describe, expect, test } from '@jest/globals';
import Banks from '../src/modules/Banks';

describe('Тест компонента Banks', () => {
  const banks = <Banks />;

  test('Banks является div элементом', () => {
    expect(banks.el).toBeInstanceOf(HTMLDivElement);
  });

  test('Во время загрузки добавляется класс skeleton', () => {
    banks.load = true;
    expect(banks.el.classList.toString()).toEqual(expect.stringContaining('skeleton'));
  });

  test('После загрузки удаляется класс skeleton', () => {
    banks.load = false;
    expect(banks.el.classList.toString()).not.toEqual(expect.stringContaining('skeleton'));
  });
});
