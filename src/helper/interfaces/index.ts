/* eslint-disable @typescript-eslint/no-explicit-any */

import { IQuery } from '@/interfaces';

export interface IAxiosConfigOptions {
  method: string;
  url: string;
  data?: any;
  params?: IQuery;
  contentType?: string;
}

export interface IConfigOptions {
  url: string;
  data?: any;
  params?: IQuery;
  contentType?: string;
}

export interface IResult {
  payload: any;
}
