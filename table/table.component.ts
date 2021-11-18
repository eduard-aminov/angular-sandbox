import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  forwardRef,
  Input,
  OnInit,
  QueryList
} from '@angular/core';
import { KeyValue } from '@angular/common';
import { TableOptions } from './table-options';
import { CellDirective } from './cell.directive';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [CellDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  @Input() options?: TableOptions;
  @ContentChildren(forwardRef(() => CellDirective))
  private readonly cells: QueryList<CellDirective<any>> = new QueryList();

  get data(): any[] {
    if (!this.options?.data?.length) {
      return [];
    }
    return this.options.data.slice();
  }

  ngOnInit(): void {
    console.log(this.cells);
  }

  originalOrder(a: KeyValue<unknown, unknown>, b: KeyValue<unknown, unknown>): number {
    return 0;
  }
}
