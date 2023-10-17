import { describe, expect, test } from '@jest/globals';
import AccountTitle from '../src/modules/AccountTitle';

describe('Тест компонента AccountTitle', () => {
  const content = '1234567';
  const title = <AccountTitle account={content} />;

  test('AccountTitle является заголовком', () => {
    expect(title.el).toBeInstanceOf(HTMLHeadingElement);
  });

  test('AccountTitle добавляет символ номера', () => {
    expect(title.el.textContent).toBe(`№ ${content}`);
  });
});
