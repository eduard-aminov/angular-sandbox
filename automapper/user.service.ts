import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserDto } from './user.dto';
import { map } from 'rxjs/operators';
import { User } from './user.model';

const USER_MOCK: UserDto = {
  is_superuser: true,
  last_login: new Date().toString(),
  // user_permissions: ['TEST'],
  groups: ['ADMIN', 'USER'],
  id: 1,
  // last_name: 'Aminov',
  // first_name: 'Eduard',
  // birth_date: '16.02.1998',
  // date_joined: new Date().toString(),
  // email: 'eduard@mail.ru',
  // is_phone_confirmed: true,
  // is_staff: true,
  // middle_name: 'Egorovich',
  // moderation_comment: 'comment',
  // moderation_status: 'accept',
  // phone: '89993452356',
  // place_of_work: 'nowork',
  // region: 'Tatarstan',
  // settlement: 'SPB',
  // username: 'ediklil'
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  loadUser(): Observable<User> {
    return of(USER_MOCK).pipe(map(dto => new User(dto)));
  }
}
