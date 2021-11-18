import { AutoMapperDecorator, AutoMapperMetadata, TransformerFn } from './types';

export const Prop = (path: string, transformer?: TransformerFn) => {
  return (target: object, propName: string) => {
    const decoratorName = AutoMapperDecorator.Prop;
    target.constructor.prototype[AutoMapperMetadata.PropMetadata] = {
      ...target.constructor.prototype[AutoMapperMetadata.PropMetadata],
      [path]: {decoratorName, propName, path, transformer},
    };
  };
};
