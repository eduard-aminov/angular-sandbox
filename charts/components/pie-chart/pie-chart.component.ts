import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface PieChartData {
  legend: string;
  value: number;
}

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartComponent {

  @Input()
  radius = 200;

  @Input()
  data: PieChartData[] = [];

  private _total = NaN;

  d = `
    M50,50 V50,0 Q100,10 100,50 H50,50
  `;

  get size(): number {
    return this.radius ? this.radius * 2 : 0;
  }

  get total(): number {
    const {data} = this;
    if (Number.isNaN(this._total) && data && Array.isArray(data) && data.length) {
      this._total = data.reduce((acc, cur) => acc + cur.value, 0);
    }
    return this._total;
  }
}
