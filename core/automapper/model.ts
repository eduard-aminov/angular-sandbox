import { AutoMapperDecorator, AutoMapperMetadata, AutoMapperPropMetadata } from './types';
import { EmptyPathError, InvalidPathError } from './errors';

type Map<T> = { [key: string]: T };

const getValueFromPath = (path: string, obj: Map<any>) => {
  return path.split('.').reduce((acc, cur) => acc[cur], obj);
};

export abstract class Model {
  constructor(data: Map<any>) {
    const metadata = this.constructor.prototype[AutoMapperMetadata.PropMetadata];
    for (const [key, value] of Object.entries<AutoMapperPropMetadata>(metadata)) {
      const {propName, decoratorName, path, transformer, model} = value;

      if (!key) { throw new EmptyPathError(decoratorName, propName); }

      let resultValue = null;

      switch (decoratorName) {
        case AutoMapperDecorator.Prop:
          const value = getValueFromPath(path, data);
          if (value === undefined) { throw new InvalidPathError(decoratorName, propName); }
          resultValue = value;
      }

      (this as Map<any>)[propName] = transformer ? transformer(resultValue) : resultValue;
    }
  }
}
