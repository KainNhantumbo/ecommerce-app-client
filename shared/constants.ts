import type { Option } from '@/types';
import Package from '../package.json';

export const constants = {
  name: 'WeCommerce',
  author: Package.author,
  version: Package.version,
  license: Package.license,
  repository: Package.repository.url,
  keywords: Package.keywords.join(' '),
  url: Package.url,
  description: Package.description
};

export const ALLOWED_MIMETYPES: string[] = ['image/png', 'image/jpeg', 'image/jpg'];

export const CART_STORAGE_KEY: string = 'CART_STORAGE_KEY';

export const PRODUCTS_LIMIT_PER_PAGE: number = 10;

export const sortOptions: Option[] = [
  { value: 'title', label: 'Title [A-Z]' },
  { value: '-title', label: 'Title [Z-A]' },
  { value: '-createdAt', label: 'Date Created' },
  { value: 'createdAt', label: 'Date Created [Inverted]' },
  { value: '-updatedAt', label: 'Date Updated' },
  { value: 'updatedAt', label: 'Date Updated [Inverted]' }
];

export const USER_ROLES: string[] = ['EMPLOYEE', 'USER', 'ADMIN'];

export const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again later.';



export const productSizes = JSON.stringify( [
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  'XXXL',
  '0',
  '2',
  '4',
  '6',
  '8',
  '10',
  '12',
  '14',
  '16',
  '18',
  '20',
  '22',
  '24',
  '26',
  '28',
  '30',
  '32',
  '34',
  '36',
  '38',
  '40',
  '42',
  '44',
  '46',
  '48',
  '50',
  '52',
  '54',
  '56',
  '58',
  '60',
  '62',
  '64',
  'One Size',
  'XXS',
  'XXXS'
].map((element) => ({ sizeId: crypto.randomUUID(), name: element, value: element.replaceAll(' ', '_').toLowerCase() })))