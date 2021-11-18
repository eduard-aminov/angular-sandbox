import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragndropComponent } from './dragndrop/dragndrop.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { SharedModule } from './shared/shared.module';
import { ButtonModule } from '@sezinno-ui/core';
import { TableComponent } from './table/table.component';
import { TablePageComponent } from './table-page/table-page.component';
import { CellDirective } from './table/cell.directive';
import { CurryModule } from './curry/curry.module';
import { LtviewModule } from './ltview/ltview.module';
import { RxjsComponent } from './rxjs/rxjs.component';

@NgModule({
  declarations: [
    AppComponent,
    DragndropComponent,
    TextEditorComponent,
    TableComponent,
    TablePageComponent,
    CellDirective,
    RxjsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ButtonModule,
    CurryModule,
    LtviewModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
