import { randomToken, randomInt } from '../src/random';

test('randomInt', () => {
  let val = randomInt(1, 10);
  expect(val).toBeLessThan(10);
  expect(val).toBeGreaterThanOrEqual(1);

  val = randomInt(1, 1);
  expect(val).toEqual(1);
});

test('randomToken', ()  => {
  const token = randomToken();
  expect(token).not.toBeNull();
  expect(token.length).toEqual(6);

  const longToken = randomToken(12);
  expect(longToken).not.toBeNull();
  expect(longToken.length).toEqual(12);
});
