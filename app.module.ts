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
import { MasonryPageComponent } from './masonry/masonry-page/masonry-page.component';
import { MasonryAreaComponent } from './masonry/masonry-area/masonry-area.component';
import { CardComponent } from './masonry/card/card.component';
import { TradingViewComponent } from './trading-view/trading-view.component';

@NgModule({
  declarations: [
    AppComponent,
    DragndropComponent,
    TextEditorComponent,
    TableComponent,
    TablePageComponent,
    CellDirective,
    RxjsComponent,
    MasonryPageComponent,
    MasonryAreaComponent,
    CardComponent,
    TradingViewComponent,
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
