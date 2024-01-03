export interface IPagination {
  page: number;
  pageSize: number;
}

export interface IQuery {
  [key: string]: string | number | boolean;
}
