import { clsx, type ClassValue } from 'clsx';
import moment from 'moment';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const currencyFormatter = (amount: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);

export const formatDate = (date: string): string => moment(date).format('LL');

export const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
