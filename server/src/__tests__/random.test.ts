import { randomToken } from '../random';

test('randomToken', () => {
  const token = randomToken();
  expect(token).not.toBeNull();
  expect(token.length).toEqual(6);

  const longToken = randomToken(12);
  expect(longToken).not.toBeNull();
  expect(longToken.length).toEqual(12);
});
