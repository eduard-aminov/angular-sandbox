import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragndropComponent } from './dragndrop/dragndrop.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { TablePageComponent } from './table-page/table-page.component';
import { CurryComponent } from './curry/curry.component';
import { LtviewComponent } from './ltview/ltview.component';
import { AutomapperComponent } from './automapper/automapper.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  {
    path: 'dragndrop', component: DragndropComponent
  },
  {
    path: 'text-editor', component: TextEditorComponent
  },
  {
    path: 'curry', component: CurryComponent
  },
  {
    path: 'table', component: TablePageComponent
  },
  {
    path: 'ltview', component: LtviewComponent,
  },
  {
    path: 'automapper', component: AutomapperComponent,
  },
  {
    path: 'rxjs', component: RxjsComponent,
  },
  {path: 'lazy', loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule)},
  {path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
