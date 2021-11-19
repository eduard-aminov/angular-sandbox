export type Type<T> = new(...args: any[]) => T;
export type TransformerFn = (...args: any[]) => any;

export enum AutoMapperMetadata {
  PropMetadata = '__automapper__prop__metadata__',
}

export enum AutoMapperDecorator {
  Prop = '@Prop',
  Merge = '@Merge',
}

export interface AutoMapperPropMetadata {
  decoratorName: string;
  propName: string;
  path: string;
  paths: string[];
  transformer?: TransformerFn;
}
