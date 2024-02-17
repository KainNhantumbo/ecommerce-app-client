import type { OrderSchemaType, UserSignupType } from '@/providers/schemas';
import type { AxiosError } from 'axios';

export type SortOptions = 'ASC' | 'DESC' | 'asc' | 'desc';

export type User = Omit<UserSignupType, 'password' | 'confirm_password'> & {
  id: string;
};

export type CreateOrder = OrderSchemaType & {
  items: { productId: number; quantity: number }[];
};

export type Order = {
  id: string;
  orderItems: { product: number; quantity: number }[];
  phone: string;
  address: string;
  isPaid: boolean;
  updatedAt: string;
  createdAt: string;
};
export type CartItem = {
  name: string;
  productId: number;
  quantity: number;
  price: number;
  category: string;
  image: ImageType;
};

export type ImageType = {
  id: number | string;
  url: string;
  createdAt: string;
  updatedAt: string;
};

export type Color = {
  id: number | string;
  label: string;
  value: string;
  createdAt: string;
  updatedAt: string;
};

export type Category = Color;

export type Size = Category;

export type Product = {
  id: number | string;
  name: string;
  price: number;
  description: string;
  specs?: string;
  isArchived: boolean;
  isFeatured: boolean;
  colors: Color[];
  images: ImageType[];
  category: Category;
  sizes: Size[];
  createdAt: string;
  updatedAt: string;
};

export type CreateProduct = {
  name: string;
  price: number;
  specs: string;
  description: string;
  sizes: Array<Omit<Size, 'updatedAt' | 'createdAt'>>;
  colors: Array<Omit<Color, 'updatedAt' | 'createdAt'>>;
  category: Omit<Category, 'updatedAt' | 'createdAt'>;
  isArchived: boolean;
  isFeatured: boolean;
  images: Array<Omit<ImageType, 'updatedAt' | 'createdAt'>>;
};

export type ProductQuery = {
  search: string;
  color: string;
  category: string;
  price: string;
  size: string;
  isFeatured: string;
  isArchived: string;
};

export type HttpError = AxiosError<{
  message: string | string[];
  statusCode: number;
  error?: string;
}>;

export type Auth = {
  id: number;
  name: string;
  token: string;
  email: string;
};

export type Option = { value: string; label: string };

export type Testimonials = Array<{
  title: string;
  comment: string;
  customerName: string;
}>;

export type Billboard = {
  id: number;
  label: string;
  image: ImageType;
  createdAt: string;
  updatedAt: string;
};

export type CreateBillboard = { label: string; image: string };
