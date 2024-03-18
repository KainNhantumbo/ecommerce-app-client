'use client';

import { EmptyMessage } from '@/components/empty-message';
import { OrderItemsTableRender } from '@/components/order-items-table-render';
import { Heading } from '@/components/ui/heading';
import { Loader } from '@/components/ui/loader';
import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/http-error-transformer';
import { currencyFormatter, formatDate } from '@/lib/utils';
import { DEFAULT_ERROR_MESSAGE } from '@/shared/constants';
import { HttpError, Order } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangleIcon } from 'lucide-react';
import { toast } from 'sonner';

export type PageProps = { params: { orderId?: string } };

export default function Page({ params: { orderId } }: PageProps) {
  const { httpClientAPI } = useAppContext();

  const {
    data: order,
    isError,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['order-viewer'],
    queryFn: async () => {
      try {
        const { data } = await httpClientAPI<Order>({
          method: 'get',
          url: `/api/v1/orders/${orderId}`
        });
        return data;
      } catch (error) {
        const { message } = errorTransformer(error as HttpError);
        toast.error(message || DEFAULT_ERROR_MESSAGE);
        console.error(message || error);
      }
    }
  });

  return (
    <main className='mx-auto mt-[90px] flex min-h-[calc(100vh_-_340px)] w-full max-w-5xl flex-col gap-8 px-4 font-sans-body'>
      <Heading title='Order Viewer' description={`Order ID: ${orderId}`} />

      {isError && !isLoading ? (
        <EmptyMessage
          icon={AlertTriangleIcon}
          action={{ label: 'Try again.', handler: () => refetch() }}
          message={errorTransformer(error as HttpError).message}
        />
      ) : null}

      {!isError && isLoading ? <Loader /> : null}

      {!isLoading && !isError && order ? (
        <section className='w-full space-y-6 '>
          <section className='w-full space-y-4'>
            <h2>Summary</h2>
            <div className='w-full space-y-2'>
              <p>
                <i className='font-semibold'>Customer Name: </i>
                {order.address}
              </p>
              <p>
                <i className='font-semibold'>Customer Address</i>: {order.address}
              </p>
              <p>
                <i className='font-semibold'>Customer Phone Number:</i> {order.phone}
              </p>
              <p>
                <i className='font-semibold'>Is Paid:</i> {String(order.isPaid)}
              </p>
              <p>
                <i className='font-semibold'>Date:</i> {formatDate(String(order.createdAt))}
              </p>
              <p>
                <i className='font-semibold'>Total Price: </i>
                {currencyFormatter(
                  order.items.map((item) => item.price).reduce((acc, curr) => acc + curr, 0)
                )}
              </p>
            </div>
          </section>
          <section className='w-full space-y-4'>
            <h2>Order Items</h2>
            <OrderItemsTableRender data={order.items} />
          </section>
        </section>
      ) : null}
    </main>
  );
}
