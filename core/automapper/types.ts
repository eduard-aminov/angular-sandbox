export type Type<T> = new(...args: any[]) => T;
export type TransformerFn = (...args: any[]) => any;

export enum AutoMapperMetadata {
  PropMetadata = '__automapper__prop__metadata__',
}

export enum AutoMapperDecorator {
  Prop = '@Prop',
}

export interface AutoMapperPropMetadata {
  decoratorName: string;
  propName: string;
  path: string;
  transformer?: TransformerFn;
  model?: Type<any>;
}

export interface Mappable {
  toCreateDto(): void;

  toUpdateDto?(): void;

  toPartialUpdateDto?(): void;

  toDeleteDto?(): void;
}
