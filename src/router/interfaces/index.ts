import { FC } from 'react';

export interface IRoute {
  key: string;
  path: string;
  component?: FC;
  children?: IRoute[];
}
