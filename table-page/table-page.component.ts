import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableOptions } from '../table/table-options';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePageComponent {
  rowData = [
    {
      name: 'Eduard',
      age: 23,
      phone: 89874246181,
      address: 'Kazan',
    },
    {
      name: 'Guzel',
      age: 23,
      phone: 89874246181,
      address: 'Kazan',
    },
    {
      name: 'Kirill',
      age: 23,
      phone: 89874246181,
      address: 'Kazan',
    },

    {
      name: 'Eduard',
      age: 23,
      phone: 89874246181,
      address: 'Kazan',
    },
    {
      name: 'Guzel',
      age: 23,
      phone: 89874246181,
      address: 'Kazan',
    },
    {
      name: 'Kirill',
      age: 23,
      phone: 89874246181,
      address: 'Kazan',
    },
  ];

  tableOptions: TableOptions = {
    cols: [
      {
        colKey: 'name',
        colName: 'Имя',
        sortable: true,
      },
      {
        colKey: 'age',
        colName: 'Возраст',
        sortable: true,
      },
      {
        colKey: 'phone',
        colName: 'Телефон',
      },
      {
        colKey: 'address',
        colName: 'Адресс',
      },
    ],
    data: this.rowData,
  };
}
