'use client';

import { EmptyMessage } from '@/components/empty-message';
import { ProductCarousel } from '@/components/product-carousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import httpClient from '@/config/http-client';
import { useCartManager } from '@/hooks/cart-manager-hook';
import { errorTransformer } from '@/lib/http-error-transformer';
import { DEFAULT_ERROR_MESSAGE } from '@/shared/constants';
import { HttpError, Product } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangleIcon } from 'lucide-react';
import Image from 'next/image';
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
    <main className='mx-auto mt-[90px] flex h-full min-h-[calc(100vh_-_340px)] w-full max-w-3xl flex-col gap-8 px-4 font-sans-body'>
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

        <section className='flex w-full flex-col gap-3 sm:flex-row'>
          <div className='w-full  max-w-[400px]'>
            {!isLoading && !isError && product ? (
              <ProductCarousel images={product.images} />
            ) : null}
          </div>
        </section>
        <section></section>
      </section>
    </main>
  );
}
