const getErrorPrefix = (decoratorName: string, propName: string) => `[${decoratorName} => ${propName}]: `;

export class EmptyPathError extends Error {
  constructor(decoratorName: string, propName: string) {
    super(getErrorPrefix(decoratorName, propName) + 'You must pass a value path');
    this.name = 'EmptyPathError';
  }
}

export class KeyNotFoundError extends Error {
  constructor(decoratorName: string, propName: string, key: string) {
    super(getErrorPrefix(decoratorName, propName) + `Cannot find [${key}] prop in dto`);
    this.name = 'KeyNotFoundError';
  }
}
