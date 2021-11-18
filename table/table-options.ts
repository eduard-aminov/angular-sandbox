export interface TableOptions {
  cols: {
    colName: string;
    colKey: string;
    sortable?: boolean;
  }[];
  data: any[];
}
