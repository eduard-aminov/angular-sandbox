import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PieChartData } from '../components/pie-chart/pie-chart.component';

const PieChartMock: PieChartData[] = [
  { legend: 'Russia', value: 12 },
  { legend: 'Canada', value: 7 },
  { legend: 'USA', value: 7 },
  { legend: 'China', value: 7 },
  { legend: 'Brazil', value: 6 },
  { legend: 'Australia', value: 5 },
  { legend: 'India', value: 2 },
  { legend: 'Others', value: 55 },
];

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit {

  pieChartData = PieChartMock;

  constructor() { }

  ngOnInit(): void {
  }

}
