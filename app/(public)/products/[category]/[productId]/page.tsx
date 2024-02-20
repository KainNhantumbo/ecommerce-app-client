'use client';

import { EmptyMessage } from '@/components/empty-message';
import { ProductCarousel } from '@/components/product-carousel';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import httpClient from '@/config/http-client';
import { useCartManager } from '@/hooks/cart-manager-hook';
import { errorTransformer } from '@/lib/http-error-transformer';
import { currencyFormatter } from '@/lib/utils';
import { DEFAULT_ERROR_MESSAGE } from '@/shared/constants';
import { HttpError, Product } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangleIcon } from 'lucide-react';
import { toast } from 'sonner';

type PageProps = { params: { category?: string; productId?: string } };

export default function Page({ params: { category, productId } }: PageProps) {
  const { addCartItem, increaseQuantity, decreaseQuantity } = useCartManager();

  const {
    data: product,
    isError,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: [`${category}-product-${productId}`],
    queryFn: async () => {
      try {
        const { data } = await httpClient.get<Product>(`/api/v1/products/${productId}`);
        return data;
      } catch (error) {
        const { message } = errorTransformer(error as HttpError);
        console.error(message || error);
        toast.error(message);
      }
    }
  });
  return (
    <main className='mx-auto mt-[90px] flex h-full min-h-[calc(100vh_-_340px)] w-full max-w-5xl flex-col gap-8 px-4 font-sans-body'>
      <section className='w-full'>
        {isError && !isLoading ? (
          <EmptyMessage
            icon={AlertTriangleIcon}
            action={{ label: 'Try again.', handler: () => refetch() }}
            message={
              errorTransformer(error as HttpError).message || DEFAULT_ERROR_MESSAGE
            }
          />
        ) : null}

        {!isLoading && !isError && product ? (
          <section className='flex w-full flex-col gap-2 sm:flex-row'>
            <div className='w-full max-w-sm'>
              <p className='mb-3 font-sans text-sm font-medium'>
                Collections / {product.category.label} /{' '}
                {product.isArchived ? 'Featured' : 'Premiere'} /{' '}
                <i className='font-semibold text-primary'>{product.name}</i>
              </p>
              <ProductCarousel images={product.images} />
            </div>
            <div className='flex w-full flex-col gap-3 sm:mt-6'>
              <h1>{product.name}</h1>

              <h2>{currencyFormatter(product.price)}</h2>

              <div className='flex w-full items-center gap-3 font-sans'>
                <Button
                  size={'lg'}
                  className='flex w-full items-center gap-1 rounded-full  bg-black font-semibold'>
                  <span className='text-white'>Buy Now</span>
                </Button>
                <Button
                  size={'lg'}
                  variant={'outline'}
                  className='flex w-full items-center gap-1 rounded-full font-semibold'>
                  <span className=''>Add to cart</span>
                </Button>
              </div>

              <Separator decorative className='my-2' />

              <div className='flex flex-col gap-2'>
                <h2 className='text-base'>Description</h2>
                <p className='text-base'>{product.description}</p>S
              </div>
            </div>
          </section>
        ) : null}
        <section></section>
      </section>
    </main>
  );
}
