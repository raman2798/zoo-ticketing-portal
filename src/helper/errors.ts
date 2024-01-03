/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { get, isEqual } from 'lodash';
import { alertingCreators, Alert, useAppDispatch } from '@/redux';

const { createAlert, discardAlert } = alertingCreators;

const handleErrors = (response: any) => {
  const message = get(response, 'message', '');

  useAppDispatch(
    createAlert({
      type: Alert.ERROR,
      isOpen: true,
      message,
    }),
  );
};

const handleReadAllErrors = (response: any) => {
  const statusCode = get(response, 'statusCode');

  if (isEqual(statusCode, 404)) {
    useAppDispatch(discardAlert());
  } else {
    handleErrors(response);
  }
};

export { handleErrors, handleReadAllErrors };
