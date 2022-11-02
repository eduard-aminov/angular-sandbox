import { PermissionDto } from './permission.model';

export interface UserDto {
  id?: number;
  groups?: string[];
  last_login?: string;
  is_superuser?: boolean;
  deep?: {
    one?: {
      middle_name?: string;
      two?: {
        value?: string;
      }
    }
  };
  user_permissions?: PermissionDto[];
  first_name?: string;
  last_name?: string;
  middle_name?: string;
}
