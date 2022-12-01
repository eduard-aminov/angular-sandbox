import { Component } from '@angular/core';
import { myInterval, myof } from './typescript/rx';

// myInterval(1, 2, 3, 4, 5).subscribe(value => console.log(value));

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-sandbox';
}
