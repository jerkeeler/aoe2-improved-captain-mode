import { TOKEN_CHARS, TOKEN_LENGTH } from './consts';

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomEl<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length)];
}

export function randomToken(tokenLength: number = TOKEN_LENGTH): string {
  return Array(tokenLength).fill(0).map(() => randomEl(TOKEN_CHARS)).join('');
}
