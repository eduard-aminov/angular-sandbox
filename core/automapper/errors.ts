import { getErrorPrefix } from './utils';

export class EmptyPathError extends Error {
  constructor(decoratorName: string, propName: string) {
    super(getErrorPrefix(decoratorName, propName) + 'You must pass a value path');
    this.name = 'EmptyPathError';
  }
}

export class InvalidPathError extends Error {
  constructor(decoratorName: string, propName: string) {
    super(getErrorPrefix(decoratorName, propName) + `Please check if path is correct.`);
    this.name = 'InvalidPathError';
  }
}

export class EmptyModelError extends Error {
  constructor(decoratorName: string, propName: string) {
    super(getErrorPrefix(decoratorName, propName) + 'You must pass model type as second argument');
    this.name = 'EmptyModelError';
  }
}

export class UniqPathError extends Error {
  constructor(decoratorName: string, propName: string) {
    super(getErrorPrefix(decoratorName, propName) + 'Path must have not duplicate');
    this.name = 'UniqPathError';
  }
}
