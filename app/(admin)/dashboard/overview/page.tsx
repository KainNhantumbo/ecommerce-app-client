'use client';

import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/http-error-transformer';
import type { HttpError, OrderItem } from '@/types';
import { useQueries } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function Page() {
  const { httpClientAPI } = useAppContext();

  const getProducts = async () => {
    try {
      const { data } = await httpClientAPI<{ name: string; price: number }[]>({
        method: 'get',
        url: '/api/v1/products?fields=name,price'
      });
      return data;
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message, {
        action: { label: 'Retry to fetch products', onClick: () => products.refetch() }
      });
      console.error(message || error);
    }
  };

  const getUsers = async () => {
    try {
      const { data } = await httpClientAPI<{ email: string }[]>({
        method: 'get',
        url: '/api/v1/users?fields=email'
      });

      return data;
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message, {
        action: { label: 'Retry to fetch users', onClick: () => users.refetch() }
      });
      console.error(message);
    }
  };

  const getOrders = async () => {
    try {
      const { data } = await httpClientAPI<{ isPaid: string; items: OrderItem[] }[]>({
        method: 'get',
        url: '/api/v1/orders?fields=isPaid,items'
      });
      return data;
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message, {
        action: { label: 'Retry to fetch orders', onClick: () => orders.refetch() }
      });
      console.error(message || error);
    }
  };

  const [users, products, orders] = useQueries({
    queries: [
      { queryFn: getUsers, queryKey: ['custom-users'] },
      { queryFn: getProducts, queryKey: ['custom-products'] },
      { queryFn: getOrders, queryKey: ['custom-orders'] }
    ]
  });

  useEffect(() => {
    console.info(users.data, products.data, orders.data);
  }, [users, products, orders]);

  return (
    <main className='space-x-480 mx-auto mt-24 flex w-full max-w-5xl flex-col gap-8 px-4 font-sans-body text-lg'>
      <h1 className='font-sans'>Overview</h1>

      <section></section>
    </main>
  );
}
