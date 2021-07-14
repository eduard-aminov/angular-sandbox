import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyComponentDirective } from './directives/lazy-component.directive';



@NgModule({
    declarations: [
        LazyComponentDirective
    ],
    exports: [
        LazyComponentDirective
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
