import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { ThCol } from './sez-th.component';

export interface ColumnOptions {
  columns: ThCol[];
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  columnOptions: ColumnOptions = {
    columns: [
      {
        name: 'Имя',
        sortBy: 'asc'
      },
      {
        name: 'Возраст',
        sortBy: 'desc'
      },
      {
        name: 'Телефон',
      },
      {
        name: 'Город',
      },
    ]
  };

  data = [
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

  columns = this.data.map(Object.keys)[0];

  constructor() { }

  ngOnInit(): void {
  }

  originalOrder = (a: KeyValue<unknown, unknown>, b: KeyValue<unknown, unknown>): number => {
    return 0;
  }

}
