import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LtviewComponent } from './ltview.component';



@NgModule({
  declarations: [
    LtviewComponent
  ],
  exports: [
    LtviewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LtviewModule { }
