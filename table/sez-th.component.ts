import { Component, Input } from '@angular/core';

export interface ThCol {
  name: string;
  sortBy?: 'asc' | 'desc';
}

@Component({
  selector: 'th[sezTh]',
  template: `<th *ngFor="let col of cols">{{col}}</th>`,
})
export class SezThComponent {
  @Input() cols: ThCol[] = [];
}
