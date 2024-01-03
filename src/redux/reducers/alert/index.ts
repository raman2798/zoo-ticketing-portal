import { PayloadAction } from '@reduxjs/toolkit';
import { actionConstants } from '@/constants';
import { IAlert, IAlertAction } from './interfaces';

const { CREATE_ALERT, DISCARD_ALERT } = actionConstants;

const initialState: IAlert = {
  isOpen: false,
  message: '',
  type: '',
  navigateLink: '',
};

const alertReducer = (state = initialState, action: PayloadAction<IAlertAction>) => {
  switch (action.type) {
    case CREATE_ALERT:
      return {
        ...action.payload,
      };
    case DISCARD_ALERT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default alertReducer;
