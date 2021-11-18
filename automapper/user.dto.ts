import { User } from './user.model';

export interface UserDto {
  id?: number;
  groups?: string[];
  last_login?: string;
  is_superuser?: boolean;
  // moderation_comment?: string;
  // moderation_status?: string;
  // username?: string;
  // email?: string;
  // is_staff?: boolean;
  // date_joined?: string;
  // first_name?: string;
  // last_name?: string;
  // middle_name?: string;
  // birth_date?: string;
  // phone?: string;
  // is_phone_confirmed?: boolean;
  // settlement?: string;
  // region?: string;
  // user_permissions?: string[];
  // place_of_work?: string;
}

export type CreateUserDto = UserDto;
export type UpdateUserDto = UserDto;
export type PartialUpdateUserDto = Partial<UserDto>;
export type DeleteUserDto = Pick<UserDto, 'id'>;

export const toCreateUserDto = (model: Required<User>): CreateUserDto => ({
  id: +model.id ?? 0,
  groups: model.groups ?? [],
  last_login: model.lastLogin ?? new Date(),
  is_superuser: model.isSuperuser ?? false,
});
