import { SyntheticEvent } from 'react';
import { alertingCreators, Alert } from '@/redux';
import { SnackbarType } from '../enums';

const { discardAlert } = alertingCreators;

export interface ICustomSnackbarProps {
  isOpen: boolean;
  message?: string;
  type: SnackbarType;
  handleClose: (_: SyntheticEvent | Event, reason?: string) => void;
}

export interface IAlertProps {
  isOpen: boolean;
  message?: string;
  navigateLink?: string;
  navigateState?: object;
  type: Alert | string;
  discardAlert: typeof discardAlert;
}
