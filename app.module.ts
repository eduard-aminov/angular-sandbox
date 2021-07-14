import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragndropComponent } from './dragndrop/dragndrop.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { SharedModule } from './shared/shared.module';
import { ButtonModule } from '@sezinno-ui/core';
import { TableComponent } from './table/table.component';
import { TablePageComponent } from './table-page/table-page.component';
import { SezThDirective } from './table/sez-th.directive';
import { SezThComponent } from './table/sez-th.component';

@NgModule({
  declarations: [
    AppComponent,
    DragndropComponent,
    TextEditorComponent,
    TableComponent,
    TablePageComponent,
    SezThDirective,
    SezThComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        ButtonModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
