import { AutoMapperDecorator, AutoMapperMetadata, AutoMapperPropMetadata } from './types';
import { EmptyPathError, KeyNotFoundError } from './errors';

type Map<T> = { [key: string]: T };

const getKeyValueFromPath = (path: string, obj: Map<any>, decoratorName: string, propName: string): [string, Map<any>] => {
  return path
    .split('.')
    .reduce((acc, cur) => {
      const value = acc[1][cur];
      if (value === undefined) { throw new KeyNotFoundError(decoratorName, propName, cur); }
      return [cur, value];
    }, ['', obj]);
};

export abstract class Model {
  constructor(data: Map<any>) {
    const metadata = this.constructor.prototype[AutoMapperMetadata.PropMetadata];
    for (const [key, value] of Object.entries<AutoMapperPropMetadata>(metadata)) {
      const {propName, decoratorName, path, paths, transformer} = value;

      if (!key) { throw new EmptyPathError(decoratorName, propName); }

      let resultValue = null;

      switch (decoratorName) {
        case AutoMapperDecorator.Prop:
          resultValue = getKeyValueFromPath(path, data, decoratorName, propName)[1];
          break;
        case AutoMapperDecorator.Merge:
          resultValue = paths.reduce((acc, cur) => {
            const [key, value] = getKeyValueFromPath(cur, data, decoratorName, propName);
            return {...acc, [key]: value};
          }, {});
          break;
      }

      (this as Map<any>)[propName] = transformer ? transformer(resultValue) : resultValue;
    }
  }
}
