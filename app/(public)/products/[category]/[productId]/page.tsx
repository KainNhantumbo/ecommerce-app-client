'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';
import { HttpError, Product } from '@/types';
import httpClient from '@/config/http-client';
import { useCartManager } from '@/hooks/cart-manager-hook';
import { useQuery } from '@tanstack/react-query';
import { errorTransformer } from '@/lib/http-error-transformer';
import { toast } from 'sonner';
import Image from 'next/image';

type PageProps = { params: { category?: string; productId?: string } };

export default function Page({ params: { category, productId } }: PageProps) {
  const { dispatch, addCartItem, increaseQuantity, decreaseQuantity } =
    useCartManager();

  const {
    data: product,
    isError,
    isLoading,
    error
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
      <section>
        <section>
          <div>
            {!isLoading && !isError && product ? (
              <Carousel>
                <CarouselPrevious />
                <CarouselContent>
                  {product.images.map((image, index) => (
                    <CarouselItem key={image.id}>
                      <Image
                        src={image.url}
                        width={280}
                        height={420}
                        alt={`${product.name} ${index + 1} image.`}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselNext />
              </Carousel>
            ) : null}
          </div>
        </section>
        <section></section>
      </section>
    </main>
  );
}
