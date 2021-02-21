import Error from '../errors/ErrorObject';

export type Response = {
  statusCode: number;
  responseObject?: object | Error;
};
