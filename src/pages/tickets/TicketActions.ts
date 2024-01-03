import { get } from 'lodash';
import { alertingCreators, Alert, useAppDispatch } from '@/redux';
import { apiEndpointsHelpers, axiosClientHelpers, errorsHelpers } from '@/helper';
import { IQuery } from '@/interfaces';

const {
  tickets: { create, readAll, readById, readByTicketId },
} = apiEndpointsHelpers;

const { createAlert, discardAlert } = alertingCreators;

const { fetchRequest, postRequest } = axiosClientHelpers;

const { handleErrors, handleReadAllErrors } = errorsHelpers;

interface CreateBody {
  guests: {
    [key: string]: number;
  };
  totalGuests: number;
  totalCharges: number;
}

export interface ITicket {
  guests: {
    [key: string]: number;
  };
  ticketId: string;
  totalGuests: number;
  totalCharges: number;
  isActive: boolean;
}

interface IReadAllData {
  data: ITicket[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

interface IReadData {
  data: ITicket;
}

export const createTicket = async (data: CreateBody): Promise<ITicket | undefined> => {
  const config = {
    url: create(),
    data,
  };

  try {
    useAppDispatch(
      createAlert({
        type: Alert.LOADER,
        isOpen: true,
      }),
    );

    const result = await postRequest(config);

    useAppDispatch(
      createAlert({
        type: Alert.SUCCESS,
        isOpen: true,
        message: 'Ticket create successfully',
      }),
    );

    return get(result, 'payload.result');
  } catch (error) {
    handleErrors(get(error, 'payload'));
  }
};

export const readAllTickets = async (query: IQuery): Promise<IReadAllData | undefined> => {
  const config = {
    url: readAll(),
    params: query,
  };

  try {
    useAppDispatch(
      createAlert({
        type: Alert.LOADER,
        isOpen: true,
      }),
    );

    const result = await fetchRequest(config);

    useAppDispatch(discardAlert());

    return get(result, 'payload.result');
  } catch (error) {
    handleReadAllErrors(get(error, 'payload'));
  }
};

export const readByIdTicket = async (id: string): Promise<IReadData | undefined> => {
  const config = {
    url: readById(id),
  };

  try {
    useAppDispatch(
      createAlert({
        type: Alert.LOADER,
        isOpen: true,
      }),
    );

    const result = await fetchRequest(config);

    useAppDispatch(discardAlert());

    return get(result, 'payload.result');
  } catch (error) {
    handleErrors(get(error, 'payload'));
  }
};

export const readTicketByTicketId = async (id: string): Promise<IReadData | undefined> => {
  const config = {
    url: readByTicketId(id),
  };

  try {
    useAppDispatch(
      createAlert({
        type: Alert.LOADER,
        isOpen: true,
      }),
    );

    const result = await fetchRequest(config);

    useAppDispatch(discardAlert());

    return get(result, 'payload.result');
  } catch (error) {
    handleErrors(get(error, 'payload'));
  }
};
