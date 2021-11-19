import { CreateUserDto, PermissionDto, toCreateUserDto, UserDto } from './user.dto';
import { Model } from '../core/automapper/model';
import { Merge, Prop } from '../core/automapper/decorators';
import { mapToModel } from '../core/automapper/utils';

export class Permission extends Model {
  @Prop('id') id?: number;
  @Prop('name', (name: string) => name + ' kek') name?: string;
}

const toLowerCaseEach = (arr: string[]) => arr.map(i => i.toLowerCase());
const mapToFalse = () => false;
const normalizeDate = (date: string) => new Intl.DateTimeFormat('ru-RU').format();
const toFullName = (value: Pick<UserDto, 'last_name' | 'first_name' | 'middle_name'>) => `${value.last_name} ${value.first_name} ${value.middle_name}`;

export class User extends Model {
  @Prop('id') id?: string;
  @Prop('groups', toLowerCaseEach) groups?: string[];
  @Prop('last_login', normalizeDate) lastLogin?: string;
  @Prop('is_superuser', mapToFalse) isSuperuser?: boolean;
  @Prop('deep.one.two.value') value?: string;
  @Prop('user_permissions', mapToModel(Permission)) roles?: Permission[];
  @Merge(['last_name', 'first_name', 'middle_name'], toFullName) fullName?: string;

  static toCreateDto(model: Required<User>): CreateUserDto {
    return toCreateUserDto(model);
  }
}
