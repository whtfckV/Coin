import { describe, expect, test } from '@jest/globals';
import ExchangeSelect from '../src/modules/ExchangeSelect';

describe('Тест компонента Banks', () => {
  const name = 'TestName';
  const description = 'Test Description';
  const select = <ExchangeSelect name={name} descr={description} />;

  test('Banks является div элементом', () => {
    expect(select.el).toBeInstanceOf(HTMLDivElement);
  });

  test('Select имеет нужный класс', () => {
    expect(select.el.classList.toString()).toEqual(expect.stringContaining(name));
  });

});
