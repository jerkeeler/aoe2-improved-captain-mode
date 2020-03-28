class InvalidCivError extends Error {
  constructor(value) {
    super(`Invalid civ value: ${value}`);
    this.name = 'InvalidCivError';
    this.value = value;
  }
}

class InvalidMapError extends Error {
  constructor(value) {
    super(`Invalid map value: ${value}`);
    this.name = 'InvalidMapError';
    this.value = value;
  }
}

class InvalidActionError extends Error {
  constructor(invalidAction) {
    super(`Invalid action captain=${invalidAction.captain} scope=${invalidAction.scope}` +
      `type=${invalidAction.type} visibility=${invalidAction.visibility}`);
    this.name = 'InvalidActionError';
    this.action = invalidAction;
  }
}

class SameTokenError extends Error {
  constructor(token) {
    super(`Token ${token} is already being used!`);
    this.name = 'SameTokenError';
  }
}

module.exports = {
  InvalidCivError,
  InvalidMapError,
  InvalidActionError,
  SameTokenError,
};
