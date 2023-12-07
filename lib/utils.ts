import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});
