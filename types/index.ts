import { AxiosError } from 'axios';

export type HttpError = AxiosError<{
  message: string | string[];
  statusCode: number;
  error?: string;
}>;

export type Auth = {
  id: string;
  name: string;
  token: string;
  email: string;
};
