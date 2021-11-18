import { CreateUserDto, toCreateUserDto } from './user.dto';
import { Model } from '../core/automapper/model';
import { Prop } from '../core/automapper/decorators';

const toLowerCaseEach = (arr: string[]) => arr.map(i => i.toLowerCase());
const mapToFalse = () => false;
const normalizeDate = (date: string) => new Intl.DateTimeFormat('ru-RU').format();

export class User extends Model {
  @Prop('id') id?: string;
  @Prop('groups', toLowerCaseEach) groups?: string[];
  @Prop('last_login', normalizeDate) lastLogin?: string;
  @Prop('is_superuser', mapToFalse) isSuperuser?: boolean;

  static toCreateDto(model: Required<User>): CreateUserDto {
    return toCreateUserDto(model);
  }
}
