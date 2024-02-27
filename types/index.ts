import type { OrderSchemaType, UserSignupType } from '@/providers/schemas';
import type { AxiosError } from 'axios';

export type User = Omit<UserSignupType, 'password' | 'confirm_password'> & {
  _id: string;
};

export type CreateOrder = OrderSchemaType & {
  items: { productId: number; quantity: number }[];
};

export type Order = {
  _id: string;
  orderItems: { product: number; quantity: number }[];
  phone: string;
  address: string;
  isPaid: boolean;
  updatedAt: string;
  createdAt: string;
};
export type CartItem = {
  name: string;
  productId: string;
  quantity: number;
  price: number;
  image: string;
  category: string
  colors: string[];
  sizes: string[];
};

export type ImageType = {
  id: string;
  url: string;
};

export type Color = {
  id: string;
  label: string;
  value: string;
};

export type Category = Color;

export type Size = Category;

export type Product = {
  _id: string;
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
  sizes: Array<Size>;
  colors: Array<Color>;
  category: Omit<Category, 'id'>;
  isArchived: boolean;
  isFeatured: boolean;
  images: Array<ImageType>;
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
  id: string;
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
  _id: string;
  label: string;
  image: ImageType;
  createdAt: string;
  updatedAt: string;
};

export type CreateBillboard = { label: string; image: string };
