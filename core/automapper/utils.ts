import { Type } from './types';

export const getErrorPrefix = (decoratorName: string, propName: string) => `[${decoratorName} => ${propName}]: `;

export const mapToModel = <T, M>(model: Type<M>) => (arr: T[]) => arr.map(item => new model(item));
