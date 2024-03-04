'use client';

import { OrdersChart } from '@/components/overview-orders-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/http-error-transformer';
import { currencyFormatter } from '@/lib/utils';
import type { HttpError, OrderItem } from '@/types';
import { useQueries } from '@tanstack/react-query';
import { DollarSignIcon, ImageIcon, UserIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function Page() {
  const { httpClientAPI } = useAppContext();

  const getProducts = async () => {
    try {
      const { data } = await httpClientAPI<
        { _id: string; name: string; price: number }[]
      >({
        method: 'get',
        url: '/api/v1/products?fields=name,price'
      });
      return data;
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message, {
        action: { label: 'Retry to fetch products', onClick: () => products.refetch() },
        duration: 5000
      });
      console.error(message || error);
    }
  };

  const getUsers = async () => {
    try {
      const { data } = await httpClientAPI<{ _id: string; email: string }[]>({
        method: 'get',
        url: '/api/v1/users?fields=email'
      });

      return data;
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message, {
        action: { label: 'Retry to fetch users', onClick: () => users.refetch() },
        duration: 5000
      });
      console.error(message);
    }
  };

  const getOrders = async () => {
    try {
      const { data } = await httpClientAPI({
        method: 'get',
        url: '/api/v1/orders?fields=isPaid,createdAt,updatedAt,items'
      });
      return data as {
        _id: string;
        createdAt: Date;
        updatedAt: Date;
        isPaid: boolean;
        items: OrderItem[];
      }[];
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message, {
        action: { label: 'Retry to fetch orders', onClick: () => orders.refetch() },
        duration: 5000
      });
      console.error(message || error);
    }
  };
  
  const getBillboards = async () => {
    try {
      const { data } = await httpClientAPI<
        { _id: string; label: string; isArchived: boolean }[]
      >({
        method: 'get',
        url: '/api/v1/billboards?fields=label,isArchived'
      });
      return data;
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message, {
        action: { label: 'Retry to fetch orders', onClick: () => orders.refetch() },
        duration: 5000
      });
      console.error(message || error);
    }
  };

  const [users, products, orders, billboards] = useQueries({
    queries: [
      { queryFn: getUsers, queryKey: ['custom-users'] },
      { queryFn: getProducts, queryKey: ['custom-products'] },
      { queryFn: getOrders, queryKey: ['custom-orders'] },
      { queryFn: getBillboards, queryKey: ['custom-billboards'] }
    ]
  });

  return (
    <main className='space-x-480 mx-auto mt-24 flex w-full max-w-5xl flex-col gap-8 px-4 font-sans-body text-lg'>
      <Heading title='Overview' description='Store stats overview' />

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 font-sans'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Amount in Products</CardTitle>
            <DollarSignIcon className='h-auto w-5 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {currencyFormatter(
                products.data
                  ? products.data
                      ?.map((item) => item.price)
                      .reduce((acc, curr) => acc + curr, 0)
                  : 0
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
            <DollarSignIcon className='h-auto w-5 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {currencyFormatter(
                orders.data
                  ? orders.data
                      ?.filter((order) => order.isPaid === true)
                      .map((order) =>
                        order.items
                          .map((item) => item.price)
                          .reduce((acc, curr) => acc + curr, 0)
                      )
                      .reduce((acc, curr) => acc + curr, 0)
                  : 0
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Accounts</CardTitle>
            <UserIcon className='h-auto w-5 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {users.data ? users.data.length : 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Billboards</CardTitle>
            <ImageIcon className='h-auto w-5 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {billboards.data ? billboards.data.length : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {orders.data ? <OrdersChart data={orders.data} /> : null}
    </main>
  );
}
