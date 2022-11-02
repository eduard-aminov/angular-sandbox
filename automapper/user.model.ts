import { UserDto } from './user.dto';
import { Model } from '../core/automapper/model';
import { Merge, Prop } from '../core/automapper/decorators';
import { Permission, PermissionDto, toPermissions } from './permission.model';
import { BackendModel } from '../core/automapper/backend-model';

const toLowerCaseEach = (arr: string[]) => arr.map(i => i.toLowerCase());
const toUpperCaseEach = (arr: string[]) => arr.map(i => i.toUpperCase());

const mapToFalse = () => false;
const mapToTrue = () => false;

const normalizeDate = (date: string) => new Intl.DateTimeFormat('ru-RU').format();

const toFullName = (value: Pick<UserDto, 'last_name' | 'first_name' | 'middle_name'>) => `${value.last_name} ${value.first_name} ${value.middle_name}`;
const parseFullName = (value: string): Pick<UserDto, 'last_name' | 'first_name' | 'middle_name'> => {
  const split = value.split(' ');
  return {
    last_name: split[0],
    first_name: split[1],
    middle_name: split[2],
  };
};

class UserBackendModel extends BackendModel<UserDto> {
  @Prop('id') id?: number;
  @Prop('groups', toUpperCaseEach) groups?: string[];
  @Prop('lastLogin') last_login?: string;
  @Prop('isSuperuser', mapToTrue) is_superuser?: boolean;
  @Prop('value') 'deep.one.two.value'?: string;
  @Prop('roles') user_permissions?: PermissionDto[];
  @Prop('fullName', value => parseFullName(value).first_name) first_name?: string;
  @Prop('fullName', value => parseFullName(value).last_name) last_name?: string;
  @Prop('fullName', value => parseFullName(value).middle_name) 'deep.one.middle_name'?: string;

  getDeleteDto(): Partial<UserDto> {
    return { id: this.id };
  }
}

export class User extends Model {
  @Prop('id') id?: string;
  @Prop('groups', toLowerCaseEach) groups?: string[];
  @Prop('last_login', normalizeDate) lastLogin?: string;
  @Prop('is_superuser', mapToFalse) isSuperuser = true;
  @Prop('deep.one.two.value') value?: string;
  @Prop('user_permissions', toPermissions) roles?: Permission[];
  @Merge(['last_name', 'first_name', 'deep.one.middle_name'], toFullName) fullName?: string;

  toBackendModel(): UserBackendModel {
    return new UserBackendModel(this);
  }
}

