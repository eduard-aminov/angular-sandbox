import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-masonry-page',
  templateUrl: './masonry-page.component.html',
  styleUrls: ['./masonry-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasonryPageComponent {

  items = [100, 200, 300, 150, 320, 180];
}
