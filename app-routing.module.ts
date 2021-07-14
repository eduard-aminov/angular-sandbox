import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragndropComponent } from './dragndrop/dragndrop.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { TablePageComponent } from './table-page/table-page.component';

const routes: Routes = [
  {
    path: 'dragndrop', component: DragndropComponent
  },
  {
    path: 'text-editor', component: TextEditorComponent
  },
  {
    path: 'table', component: TablePageComponent
  },
  { path: 'lazy', loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
