
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
// import moment from 'moment';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currencyFormatter = (param: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(param);

// export const formatDate = (date: string): string => moment(date).format('LL');
