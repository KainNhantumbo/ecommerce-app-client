'use client';

import { BillboardsCarousel } from '@/components/billboards-carousel';
import { EmptyMessage } from '@/components/empty-message';
import { QueryProductsBar } from '@/components/query-products-bar';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { Separator } from '@/components/ui/separator';
import { useQueryProducts } from '@/hooks/query-products-hook';
import { errorTransformer } from '@/lib/http-error-transformer';
import { currencyFormatter, scrollToTop } from '@/lib/utils';
import type { HttpError } from '@/types';
import { AlertTriangleIcon, LayoutDashboardIcon, ShoppingBagIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  const { products, inViewRef, isLoading, isError, error, refetch, hasNextPage } =
    useQueryProducts();

  return (
    <main className='mx-auto mt-16 flex w-full max-w-5xl flex-col gap-8 px-4 font-sans-body text-lg'>
      <BillboardsCarousel />

      <QueryProductsBar />

      <section className='grid w-full grid-cols-1 gap-3 mobile:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
        {products.length > 0
          ? products.map((product, index) => (
              <Link
                key={product.id}
                className='base-border  flex w-full flex-col gap-2 rounded-lg'
                ref={products.length === index + 1 ? inViewRef : undefined}
                href={`/products/${product.category.value}/${product.id}`}>
                <Image
                  src={product.images[0].url}
                  width={280}
                  height={420}
                  priority
                  alt={`${product.name} image`}
                  className='h-full max-h-[220px] w-full rounded-t-lg object-cover'
                />
                <div className='flex flex-col justify-between gap-2 p-2 font-sans text-sm font-medium'>
                  <span>{product.name}</span>
                  <span className='text-base font-semibold text-primary'>
                    {currencyFormatter(product.price)}
                  </span>
                </div>
              </Link>
            ))
          : null}
      </section>

      {!isError && !isLoading && !hasNextPage ? (
        <div>
          <Separator decorative className='mb-2' />
          <div className='mx-auto flex w-full max-w-[300px] flex-col items-center gap-3'>
            <p className='font-sans text-sm font-medium'>Reached the end.</p>
            <Button variant={'secondary'} onClick={scrollToTop}>
              Scroll back to top
            </Button>
          </div>
        </div>
      ) : null}

      {products.length < 0 && !isError && !isLoading ? (
        <EmptyMessage icon={LayoutDashboardIcon} message='No products to show yet.' />
      ) : null}

      {!isError && !isLoading && products.length < 1 ? (
        <EmptyMessage
          icon={ShoppingBagIcon}
          message={'No products to show yet. Please come back later.'}
        />
      ) : null}

      {isError && !isLoading ? (
        <EmptyMessage
          icon={AlertTriangleIcon}
          action={{ label: 'Try again.', handler: () => refetch() }}
          message={errorTransformer(error as HttpError).message}
        />
      ) : null}

      {!isError && isLoading ? (
        <div className='mx-auto flex w-full max-w-xs flex-col items-center gap-3'>
          <Loader />
          <p className='text-sm font-semibold'>Loading products, please wait...</p>
        </div>
      ) : null}
    </main>
  );
}
