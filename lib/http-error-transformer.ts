import { HttpError } from '@/types';

export const errorTransformer = ({ response }: HttpError) => {
  let message: string = '';

  if (response?.data && response.data.message) {
    if (Array.isArray(response.data.message)) {
      message = response.data.message.reduce((value, current) => {
        const message = value.concat(current.toUpperCase(), '. ');
        return message;
      }, '');
    } else {
      message = response.data.message;
    }
  }

  return { message, statusCode: response?.data.statusCode };
};
