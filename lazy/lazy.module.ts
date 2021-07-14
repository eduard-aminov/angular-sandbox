import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyRoutingModule } from './lazy-routing.module';
import { ParentComponent } from './parent.component';
import { ChildComponent } from './child/child.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ParentComponent,
    ChildComponent
  ],
  imports: [
    CommonModule,
    LazyRoutingModule,
    SharedModule
  ]
})
export class LazyModule { }
