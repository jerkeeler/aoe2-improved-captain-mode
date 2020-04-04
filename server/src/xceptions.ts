import { Action } from '@icm/shared/types';

export class InvalidCivError extends Error {
  constructor(value: number) {
    super(`Invalid civ value: ${value}`);
    this.name = 'InvalidCivError';
  }
}

export class InvalidMapError extends Error {
  constructor(value: number) {
    super(`Invalid map value: ${value}`);
    this.name = 'InvalidMapError';
  }
}

export class InvalidActionError extends Error {
  constructor(invalidAction: Action) {
    super(
      `Invalid action captain=${invalidAction.captain} scope=${invalidAction.scope}` +
        `type=${invalidAction.type} visibility=${invalidAction.visibility}`,
    );
    this.name = 'InvalidActionError';
  }
}

export class SameTokenError extends Error {
  constructor(token: string) {
    super(`Token ${token} is already being used!`);
    this.name = 'SameTokenError';
  }
}
