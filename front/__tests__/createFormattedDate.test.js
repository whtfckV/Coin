import { describe, expect, test } from '@jest/globals';
import createFormattedDate from '../src/scripts/createFormattedDate';

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
];

test('Функция должна возвращать дату в нужном формате', () => {
  const validDate = `${new Date().getDate()} ${months[new Date().getMonth()]} ${new Date().getFullYear()}`;

  expect(createFormattedDate({ date: new Date })).toBe(validDate);
});
