import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {
  @Input() name: string | undefined;
  @Input() age: number | undefined;
  @Output() nameChange = new EventEmitter();

  nameChanged(): void {
    this.nameChange.emit('Eduard');
  }
}
