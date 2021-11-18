import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { ChartComponent } from './chart/chart.component';
import { ChartsRoutingModule } from './charts-routing.module';


@NgModule({
  declarations: [
    PieChartComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule,
  ]
})
export class ChartsModule {}
