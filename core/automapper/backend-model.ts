import { Model } from './model';

const getModelProps = <Model, Dto>(model: Model): Dto => {
  return Object.keys(model).reduce((acc, cur) => {
    if (typeof model[cur as keyof Model] !== 'function') {
      return {...acc, [cur]: model[cur as keyof Model]};
    }
    return acc;
  }, {}) as Dto;
};

export abstract class BackendModel<Dto> extends Model {
  public getGetDto(): Dto {
    return getModelProps(this);
  }

  public getPostDto(): Dto {
    return getModelProps(this);
  }

  public getPutDto(): Dto {
    return getModelProps(this);
  }

  public getPatchDto(): Partial<Dto> {
    return getModelProps(this);
  }

  public getDeleteDto?(): Partial<Dto> {
    return getModelProps(this);
  }
}
