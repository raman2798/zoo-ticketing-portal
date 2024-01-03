/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-throw-literal */
import axios, { AxiosResponse } from 'axios';
import { get, isArray, isEmpty, isEqual, isNil, join, mapValues, omitBy, toUpper } from 'lodash';
import { appConfiguration } from '@/config';
import { messageConstants } from '@/constants';
import { IAxiosConfigOptions, IConfigOptions, IResult } from './interfaces';
import { IQuery } from '@/interfaces';

const { baseUrl } = appConfiguration;

const { WENT_WRONG } = messageConstants;

const sanitizeIQuery = (obj: IQuery): IQuery => {
  let query = omitBy(obj, (value) => isArray(value) && isEmpty(value));

  query = mapValues(query, (value) => (isArray(value) ? join(value, ',') : value));

  query = omitBy(query, isNil);

  return query;
};

const makeRequest = async (config: IAxiosConfigOptions): Promise<IResult> => {
  try {
    const params = get(config, 'params');
    const data = get(config, 'data');
    const contentType = get(config, 'contentType', 'application/json');

    const axiosConfig = {
      method: toUpper(get(config, 'method')),
      baseURL: baseUrl,
      url: get(config, 'url'),
      ...(isNil(params) ? {} : { params: sanitizeIQuery(params) }),
      ...(isNil(data) ? {} : { data: isEqual(contentType, 'application/json') ? JSON.stringify(data) : data }),
      headers: {
        'Content-type': contentType,
      },
    };

    const result: AxiosResponse = await axios(axiosConfig);

    const axiosData = { payload: { result: get(result, 'data.result') } };

    return axiosData;
  } catch (error) {
    const statusCode = get(error, 'response.data.statusCode');

    const message = get(error, 'response.data.error.message', WENT_WRONG);

    const axiosData = { payload: { statusCode, message } };

    throw axiosData;
  }
};

const fetchRequest = async ({ url, params }: IConfigOptions): Promise<IResult> => makeRequest({ method: 'get', url, data: null, params });

const postRequest = async ({ url, data, contentType, params }: IConfigOptions): Promise<IResult> => makeRequest({ method: 'post', url, data, contentType, params });

const updateRequest = async ({ url, data, contentType, params }: IConfigOptions): Promise<IResult> => makeRequest({ method: 'put', url, data, contentType, params });

export { fetchRequest, postRequest, updateRequest };
