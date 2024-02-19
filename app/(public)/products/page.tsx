'use client';

import { BillboardsCarousel } from '@/components/billboards-carousel';
import { EmptyMessage } from '@/components/empty-message';
import { useQueryProducts } from '@/hooks/query-products-hook';
import { errorTransformer } from '@/lib/http-error-transformer';
import { currencyFormatter } from '@/lib/utils';
import { DEFAULT_ERROR_MESSAGE } from '@/shared/constants';
import type { HttpError } from '@/types';
import {
  AlertTriangleIcon,
  LayoutDashboardIcon,
  LoaderIcon,
  ShoppingBagIcon
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  const { products, inViewRef, isLoading, isError, error } = useQueryProducts();

  [{ la: '' }];

  return (
    <main className='mx-auto mt-16 flex w-full max-w-5xl flex-col gap-8 px-4 font-sans-body text-lg'>
      <BillboardsCarousel />
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
          message={
            errorTransformer(error as HttpError).message || DEFAULT_ERROR_MESSAGE
          }
        />
      ) : null}

      {!isError && isLoading ? (
        <EmptyMessage icon={LoaderIcon} message='Loading products data, please wait.' />
      ) : null}
    </main>
  );
}
