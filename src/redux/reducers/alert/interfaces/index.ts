import { Alert } from '../enums';

export interface IAlert {
  isOpen: boolean;
  message?: string;
  navigateLink?: string;
  navigateState?: object;
  type: Alert | string;
}

export interface IAlertAction {
  type: string;
  payload: IAlert;
}
