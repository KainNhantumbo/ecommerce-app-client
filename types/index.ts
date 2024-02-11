import type { OrderSchemaType, UserSignupType } from '@/providers/schemas';
import type { AxiosError } from 'axios';

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

export type ImageType = {
  id: number;
  publicId?: string;
  url: string;
  createdAt: string;
  updatedAt: string;
};

export type Color = {
  id: number;
  name: string;
  value: string;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: number;
  name: string;
  value: string;
  createdAt: string;
  updatedAt: string;
};

export type CartItem = {
  name: string;
  productId: number;
  quantity: number;
  price: number;
  category: string;
  image: ImageType;
};

export type Size = {
  id: number;
  name: string;
  value: string;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  isArchived: boolean;
  isFeatured: boolean;
  color: Color;
  images: ImageType[];
  category: Category;
  sizes: Size[];
  createdAt: string;
  updatedAt: string;
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

