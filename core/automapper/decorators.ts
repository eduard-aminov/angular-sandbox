import { AutoMapperDecorator, AutoMapperMetadata, TransformerFn } from './types';

export const Prop = (path: string, transformer?: TransformerFn): any => {
  return (target: object, propName: string): any => {
    const decoratorName = AutoMapperDecorator.Prop;
    target.constructor.prototype[AutoMapperMetadata.PropMetadata] = {
      ...target.constructor.prototype[AutoMapperMetadata.PropMetadata],
      [path]: {decoratorName, propName, path, transformer},
    };
  };
};

export const Merge = (paths: string[], transformer?: TransformerFn): any => {
  return (target: object, propName: string): any => {
    const decoratorName = AutoMapperDecorator.Merge;
    target.constructor.prototype[AutoMapperMetadata.PropMetadata] = {
      ...target.constructor.prototype[AutoMapperMetadata.PropMetadata],
      [paths.toString()]: {decoratorName, propName, paths, transformer},
    };
  };
};

