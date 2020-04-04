import { randomEl } from '@icm/shared/random';

import { TOKEN_CHARS, TOKEN_LENGTH } from './consts';

export function randomToken(tokenLength: number = TOKEN_LENGTH): string {
  return Array(tokenLength)
    .fill(0)
    .map(() => randomEl(TOKEN_CHARS))
    .join('');
}
