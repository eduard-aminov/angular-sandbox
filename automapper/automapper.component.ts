import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { tap } from 'rxjs/operators';
import { User } from './user.model';

@Component({
  selector: 'app-automapper',
  templateUrl: './automapper.component.html',
  styleUrls: ['./automapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutomapperComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.loadUser().pipe(tap(console.log), tap(model => console.log(User.toCreateDto(model))))
        .subscribe();
  }

}
