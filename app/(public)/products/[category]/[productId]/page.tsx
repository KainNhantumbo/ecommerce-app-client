'use client';

import { EmptyMessage } from '@/components/empty-message';
import { ProductCarousel } from '@/components/product-carousel';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
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

type Props = { params: { category?: string; productId?: string } };

export default function Page<T extends Props>({ params: { category, productId } }: T) {
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

  const cartProduct = useMemo<CartItem>(() => {
    const foundProduct = cart.find((item) => item.productId === product?._id);
    const colors = Array.from(
      new Set([
        ...Array.from(foundProduct?.colors || []),
        ...Array.from(searchParams.get('colors')?.split(',') || [])
      ])
    );

    const sizes = Array.from(
      new Set([
        ...Array.from(foundProduct?.sizes || []),
        ...Array.from(searchParams.get('sizes')?.split(',') || [])
      ])
    );

    return {
      colors,
      sizes,
      productId: String(productId),
      name: product?.name || '',
      image: product?.images[0].url || '',
      price: product?.price || 0,
      quantity: Number(searchParams.get('quantity')) || 1,
      category: String(category)
    };
  }, [searchParams, product]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      router.replace(
        pathname.concat(
          '?',
          new URLSearchParams({
            colors: cartProduct.colors.toString(),
            sizes: cartProduct.sizes.toString()
          }).toString()
        )
      );

      if (product && isInCart(product._id)) {
        dispatch(
          updateCart([
            ...cart.map((item) =>
              item.productId === product._id ? { ...item, ...cartProduct } : item
            )
          ])
        );
      }
    }, 200);
    return () => clearTimeout(debounceTimer);
  }, [searchParams, product, cartProduct]);

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

        {!isError && isLoading ? <Loader /> : null}

        {!isLoading && !isError && product ? (
          <section className='flex flex-col gap-5'>
            <section className=' flex w-full flex-col items-center gap-3 sm:flex-row sm:items-start'>
              <div className='mb-20 w-full max-w-[360px]'>
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

                <div className='flex w-full flex-col gap-2 font-sans'>
                  <h3 className='capitalize'>{product.sizes.length} sizes available</h3>
                  <ToggleGroup
                    size={'sm'}
                    className='base-border flex w-full flex-wrap items-center justify-start gap-2 rounded-lg p-1 '
                    type='multiple'
                    value={cartProduct.sizes}
                    onValueChange={(options) => {
                      router.replace(
                        pathname.concat(
                          '?',
                          new URLSearchParams({
                            colors: cartProduct.colors.toString(),
                            sizes: options.toString()
                          }).toString()
                        )
                      );
                    }}>
                    {product.sizes.map(({ id, label, value }) => (
                      <ToggleGroupItem
                        key={id}
                        value={value}
                        size={'sm'}
                        className='rounded-lg px-2 font-semibold uppercase'>
                        {label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>

                <div className='flex w-full flex-col gap-2 font-sans'>
                  <h3 className='capitalize'>{product.colors.length} colors available</h3>
                  <ToggleGroup
                    type='multiple'
                    size={'sm'}
                    className='base-border flex w-full flex-wrap items-center justify-start gap-2 rounded-lg p-1 '
                    value={cartProduct.colors}
                    onValueChange={(options) => {
                      router.replace(
                        pathname.concat(
                          '?',
                          new URLSearchParams({
                            colors: options.toString(),
                            sizes: cartProduct.sizes.toString()
                          }).toString()
                        )
                      );
                    }}>
                    {product.colors.map(({ id, label, value }) => (
                      <ToggleGroupItem
                        key={id}
                        value={value}
                        size={'sm'}
                        className='flex flex-nowrap items-center gap-1 rounded-lg px-2 font-semibold uppercase'>
                        <div
                          className='base-border h-4 w-4 rounded-full'
                          style={{ background: value }}
                        />
                        <span>{label}</span>
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>

                <div className='flex w-full items-center gap-3 font-sans'>
                  <Button
                    size={'lg'}
                    className='flex w-full items-center gap-1 rounded-full  bg-black font-semibold'
                    onClick={() => {
                      if (cartProduct.colors.filter((item) => item !== '').length < 1)
                        return toast.error(
                          'Please select one or more colors before proceeding.'
                        );
                      if (cartProduct.sizes.filter((item) => item !== '').length < 1)
                        return toast.error(
                          'Please select one or more sizes before proceeding.'
                        );

                      if (!isInCart(product._id)) addCartItem(cartProduct);
                      router.push('/checkout');
                    }}>
                    <span className='text-white'>Buy Now</span>
                  </Button>

                  {isInCart(product._id) ? (
                    <Button
                      size={'lg'}
                      variant={'outline'}
                      className='flex w-full items-center gap-1 rounded-full font-semibold'
                      onClick={() => removeCartItem(product._id)}>
                      Remove
                    </Button>
                  ) : (
                    <Button
                      size={'lg'}
                      variant={'outline'}
                      className='flex w-full items-center gap-1 rounded-full font-semibold'
                      onClick={() => {
                        if (cartProduct.colors.filter((item) => item !== '').length < 1)
                          return toast.error(
                            'Please select one or more colors before proceeding.'
                          );
                        if (cartProduct.sizes.filter((item) => item !== '').length < 1)
                          return toast.error(
                            'Please select one or more sizes before proceeding.'
                          );
                        addCartItem(cartProduct);
                      }}>
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
