import { AxiosError } from 'axios';

export type ImageType = {
  id: number;
  publicId: string;
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
  productId: string;
  quantity: number;
  price: number;
  image: Partial<ImageType>;
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
  category: Category
  sizes: Size[]
  createdAt: string;
  updatedAt: string;
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
