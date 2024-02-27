'use client';

import { EmptyMessage } from '@/components/empty-message';
import { OrderTableRender } from '@/components/orders-table-render';
import { Heading } from '@/components/ui/heading';
import { Loader } from '@/components/ui/loader';
import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/http-error-transformer';
import { updateOrders } from '@/redux/slices/orders';
import { AppDispatch, RootState } from '@/redux/store';
import { HttpError, Order } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function Page() {
  const { httpClientAPI } = useAppContext();
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.orders);

  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ['orders-query'],
    queryFn: async () => {
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
    }
  });

  useEffect(() => {
    if (data) dispatch(updateOrders(data));
  }, [data]);

  return (
    <main className='mx-auto mt-[90px] flex min-h-[calc(100vh_-_340px)] w-full max-w-3xl flex-col gap-8 px-4 font-sans-body'>
      <Heading title='Orders' description='View and manage store order reports' />

      <section>
        {!isLoading && !isError ? <OrderTableRender data={orders} /> : null}

        {!isLoading && isError ? (
          <EmptyMessage
            icon={AlertTriangle}
            action={{ handler: () => refetch(), label: 'Retry' }}
            message={errorTransformer(error as HttpError).message}
          />
        ) : null}

        {isLoading && !isError ? (
          <div className='grid h-full w-full place-content-center place-items-center bg-background py-20'>
            <Loader />
          </div>
        ) : null}
      </section>
    </main>
  );
}
