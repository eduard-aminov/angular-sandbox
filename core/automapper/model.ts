import { AutoMapperDecorator, AutoMapperMetadata, AutoMapperPropMetadata, Type } from './types';
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

  private readonly _source: Map<any> | null = null;

  constructor(data: Map<any>) {
    this._source = data;

    const metadata = this.constructor.prototype[AutoMapperMetadata.PropMetadata];

    if (metadata) {
      for (const [key, value] of Object.entries<AutoMapperPropMetadata>(metadata)) {
        const {propName, decoratorName, path, paths, transformer} = value;

        if (!key) { throw new EmptyPathError(decoratorName, propName); }

        let resultValue = null;

        switch (decoratorName) {
          case AutoMapperDecorator.Prop:

            if (propName.split('.').length > 1) {
              const pathPieces = propName.split('.');
              const rootPath = pathPieces.shift()!;
              let nestedProp = (this as Map<any>)[rootPath] ?? {};

              for (const piece of pathPieces) {
                if (!nestedProp[piece]) {

                } else {

                }
              }
              console.log(propName);
            }

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

  static from<T, M>(from: T[], to: Type<M>): M[] {
    return from.map(item => new to(item));
  }

  getSource(): Map<any> | null {
    return this._source;
  }
}
