// constant modules
import { actionConstants } from '@/constants';
import { IAlert } from '@/redux';

const { CREATE_ALERT, DISCARD_ALERT } = actionConstants;

const createAlert = (newAlert: IAlert) => ({
  type: CREATE_ALERT,
  payload: { ...newAlert },
});

const discardAlert = () => ({
  type: DISCARD_ALERT,
  payload: {},
});

export { createAlert, discardAlert };
