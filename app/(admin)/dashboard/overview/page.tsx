'use client';

import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/http-error-transformer';
import type { HttpError, Order, Product, User } from '@/types';
import { useQueries } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function Page() {
  const { httpClientAPI } = useAppContext();

  const getProducts = async () => {
    try {
      const { data } = await httpClientAPI<Product[]>({
        method: 'get',
        url: '/api/v1/products'
      });
      return data;
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message);
      console.warn(message || error);
    }
  };

  const getUsers = async () => {
    try {
      const { data } = await httpClientAPI<User[]>({
        method: 'get',
        url: '/api/v1/users'
      });
      console.info(data);
      return data;
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message);
      console.warn(message);
    }
  };

  const getOrders = async () => {
    try {
      const { data } = await httpClientAPI<Order[]>({
        method: 'get',
        url: '/api/v1/orders'
      });
      return data;
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message);
      console.warn(message || error);
    }
  };

  const [users] = useQueries({
    queries: [
      { queryFn: getUsers, queryKey: ['users'] },
      { queryFn: getProducts, queryKey: ['products'] }
    ]
  });

  useEffect(() => {
    // query()
    getUsers();
    console.info(users);
  }, [users]);

  return (
    <main className='space-x-480 mx-auto mt-24 flex w-full max-w-5xl flex-col gap-8 px-4 font-sans-body text-lg'>
      <h1 className='font-sans'>Overview</h1>

      <section></section>
    </main>
  );
}
