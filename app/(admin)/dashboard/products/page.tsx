'use client';

import { EmptyMessage } from '@/components/empty-message';
import { ProductTableRender } from '@/components/product-table-render';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader } from '@/components/ui/loader';
import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/http-error-transformer';
import { updateProducts } from '@/redux/slices/products';
import { AppDispatch, RootState } from '@/redux/store';
import { DEFAULT_ERROR_MESSAGE } from '@/shared/constants';
import { HttpError, Product } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function Page() {
  const { httpClientAPI } = useAppContext();
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products);

  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ['products-query'],
    queryFn: async () => {
      try {
        const { data } = await httpClientAPI<Product[]>({
          method: 'get',
          url: '/api/v1/products'
        });
        return data;
      } catch (error) {
        const { message } = errorTransformer(error as HttpError);
        toast.error(message || DEFAULT_ERROR_MESSAGE);
        console.warn(message || error);
      }
    }
  });

  useEffect(() => {
    if (data) dispatch(updateProducts(data));
  }, [data]);

  return (
    <main className='mx-auto mt-[90px] flex min-h-[calc(100vh_-_340px)] w-full max-w-3xl flex-col gap-8 px-4 font-sans-body'>
      <div className='flex w-full flex-wrap items-center justify-between gap-3'>
        <Label className='font-sans text-4xl leading-relaxed'>Products</Label>
        <Button asChild>
          <Link href={`/dashboard/products/create/new`} className='text-white'>
            Create Product
          </Link>
        </Button>
      </div>

      <section>
        {!isLoading && !isError ? <ProductTableRender data={products} /> : null}

        {!isLoading && isError ? (
          <EmptyMessage
            icon={AlertTriangle}
            action={{ handler: () => refetch(), label: 'Retry' }}
            message={
              errorTransformer(error as HttpError).message || DEFAULT_ERROR_MESSAGE
            }
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
