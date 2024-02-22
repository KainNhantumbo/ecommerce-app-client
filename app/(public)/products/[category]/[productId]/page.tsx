'use client';

import { EmptyMessage } from '@/components/empty-message';
import { ProductCarousel } from '@/components/product-carousel';
import { TooltipWrapper } from '@/components/tooltip-wrapper';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import httpClient from '@/config/http-client';
import { useCartManager } from '@/hooks/cart-manager-hook';
import { errorTransformer } from '@/lib/http-error-transformer';
import { currencyFormatter } from '@/lib/utils';
import { CartItem, HttpError, Product } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangleIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { toast } from 'sonner';

type PageProps = { params: { category?: string; productId?: string } };

export default function Page({ params: { category, productId } }: PageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

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

  const { addCartItem, removeCartItem, dispatch, cart, updateCart, isInCart } =
    useCartManager();

  const cartProduct = useMemo<CartItem>(
    () => ({
      productId: Number(productId),
      name: product?.name || '',
      colors: searchParams.get('colors')?.split(',') || [],
      sizes: searchParams.get('sizes')?.split(',') || [],
      image: product?.images[0].url || '',
      price: product?.price || 0,
      quantity: Number(searchParams.get('quantity')) || 0
    }),
    [searchParams, product]
  );

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      router.replace(
        pathname.concat(
          '?',
          new URLSearchParams({
            quantity: cartProduct.quantity.toString(),
            colors: cartProduct.colors.toString(),
            sizes: cartProduct.sizes.toString()
          }).toString()
        )
      );

      if (product && isInCart(+product.id)) {
        dispatch(
          updateCart([
            ...cart.map((item) =>
              item.productId === product.id ? { ...item, ...cartProduct } : item
            )
          ])
        );
      }
    }, 200);
    return () => clearTimeout(debounceTimer);
  }, [searchParams, product]);

  return (
    <main className='mx-auto mt-[90px] flex h-full min-h-[calc(100vh_-_340px)] w-full max-w-4xl flex-col gap-8 px-4 font-sans-body'>
      <section className='w-full'>
        {isError && !isLoading ? (
          <EmptyMessage
            icon={AlertTriangleIcon}
            action={{ label: 'Try again.', handler: () => refetch() }}
            message={errorTransformer(error as HttpError).message}
          />
        ) : null}

        {!isLoading && !isError && product ? (
          <section className='flex flex-col gap-5'>
            <section className='flex w-full flex-col gap-2 sm:flex-row'>
              <div className='w-full max-w-[360px]'>
                <p className='mb-3 font-sans text-sm font-medium'>
                  Collections / {product.category.label} /{' '}
                  {product.isArchived ? 'Featured' : 'Premiere'} /{' '}
                  <i className='font-semibold text-primary'>{product.name}</i>
                </p>
                <ProductCarousel images={product.images} />
              </div>
              <div className='flex w-full flex-col gap-6 sm:mt-6'>
                <h1>{product.name}</h1>

                <h2 className='text-3xl font-extrabold'>
                  {currencyFormatter(product.price)}
                </h2>

                <div className='flex w-full flex-wrap gap-2 font-sans'>
                  <h3 className='capitalize'>
                    {product.colors.length} colors available
                  </h3>
                  <div className='flex items-center gap-2'>
                    {product.colors.map((color) => (
                      <TooltipWrapper key={color.id} content={color.label}>
                        <div
                          className='base-border h-6 w-6 rounded-full'
                          style={{ background: color.value }}
                        />
                      </TooltipWrapper>
                    ))}
                  </div>
                </div>

                <div className='flex w-full items-center gap-3 font-sans'>
                  <Button
                    size={'lg'}
                    className='flex w-full items-center gap-1 rounded-full  bg-black font-semibold'
                    onClick={() => {
                      if (!isInCart(+product.id)) addCartItem(cartProduct);
                      router.push('/checkout');
                    }}>
                    <span className='text-white'>Buy Now</span>
                  </Button>

                  {isInCart(+product.id) ? (
                    <Button
                      size={'lg'}
                      variant={'outline'}
                      className='flex w-full items-center gap-1 rounded-full font-semibold'
                      onClick={() => removeCartItem(+product.id)}>
                      Remove
                    </Button>
                  ) : (
                    <Button
                      size={'lg'}
                      variant={'outline'}
                      className='flex w-full items-center gap-1 rounded-full font-semibold'
                      onClick={() => addCartItem(cartProduct)}>
                      Add to cart
                    </Button>
                  )}
                </div>

                <Separator decorative className='my-2' />

                <div className='flex flex-col gap-2'>
                  <h2 className='text-base'>Description</h2>
                  <p className='text-base'>{product.description}</p>
                </div>
              </div>
            </section>
            <section className='mt-8'>
              <div className='flex flex-col gap-2'>
                <h2 className='text-base'>Product Details</h2>
                {product.specs && product.specs.includes('\n') ? (
                  product.specs
                    .split('\n')
                    .map((phrase, index) => <p key={index}>{phrase}</p>)
                ) : (
                  <p>{product.specs}</p>
                )}
              </div>
            </section>
          </section>
        ) : null}
      </section>
    </main>
  );
}
