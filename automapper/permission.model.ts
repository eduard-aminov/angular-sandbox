import { Model } from '../core/automapper/model';
import { Prop } from '../core/automapper/decorators';
import { BackendModel } from '../core/automapper/backend-model';

export interface PermissionDto {
  id_test?: number;
  name_test?: string;
}

export const toPermissions = <T>(items: T[]) => Model.from(items, Permission);

const addAsteriskToStr = (str: string) => str + '*';
const removeAsteriskFromStrEnd = (str: string) => str.split('*')[0];

class PermissionBackendModel extends BackendModel<PermissionDto> {
  @Prop('id') id_test?: number;
  @Prop('name', removeAsteriskFromStrEnd) name_test?: string;

  getDeleteDto(): Partial<PermissionDto> {
    return {id_test: this.id_test};
  }
}

export class Permission extends Model {
  @Prop('id_test') id?: number;
  @Prop('name_test', addAsteriskToStr) name?: string;

  toBackendModel(): PermissionBackendModel {
    return new PermissionBackendModel(this);
  }
}
