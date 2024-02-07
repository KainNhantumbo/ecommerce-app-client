'use client';

import { BillboardsCarousel } from '@/components/billboards-carousel';
import httpClient from '@/config/http-client';
import { currencyFormatter } from '@/lib/utils';
import type { AppDispatch, RootState } from '@/redux/store';
import { PRODUCTS_LIMIT_PER_PAGE } from '@/shared/constants';
import type { Product } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { updateProducts } from '@/redux/slices/products';
import { Button } from '@/components/ui/button';
import { TooltipWrapper } from '@/components/tooltip-wrapper';
import {
  AlertTriangleIcon,
  LayoutDashboardIcon,
  LoaderIcon,
  ShoppingBagIcon
} from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';
import { EmptyMessage } from '@/components/empty-message';

export type ProductProperties = {
  categories: string[];
  colors: string[];
  sizes: string[];
};

export default function Page() {
  const { ref: inViewRef, inView } = useInView();

  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products);
  const cart = useSelector((state: RootState) => state.cart);
  const params = useSearchParams();

  const getProducts = async ({ pageParam = 0 }) => {
    const queryParams = new URLSearchParams({
      search: params.get('search') || '',
      offset: Number(PRODUCTS_LIMIT_PER_PAGE * pageParam)
        ? String(PRODUCTS_LIMIT_PER_PAGE * pageParam)
        : '',
      limit: String(PRODUCTS_LIMIT_PER_PAGE),
      category: params.get('category') || '',
      color: params.get('color') || '',
      sort: params.get('sort') || '',
      size: params.get('size') || ''
    });

    const { data } = await httpClient<Product[]>({
      method: 'get',
      url: `/api/v1/products/public?${queryParams.toString()}`
    });
    return { data, currentOffset: pageParam + 1 };
  };

  const { data, refetch, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      initialPageParam: 1,
      queryKey: ['public-products'],
      queryFn: getProducts,
      getNextPageParam: ({ data, currentOffset }) =>
        data.length >= PRODUCTS_LIMIT_PER_PAGE ? currentOffset : undefined
    });

  const incomingData: Product[] = useMemo(() => {
    if (data)
      return data?.pages
        .map((page) => {
          return page.data;
        })
        .reduce((accumulator, currentObj) => [...accumulator, ...currentObj]);
    return [];
  }, [data]);

  const productProperties: ProductProperties = useMemo(() => {
    return {
      sizes: Array.from(
        new Set<string>(products.map((product) => product.sizes.toString()))
      ),
      categories: Array.from(
        new Set<string>(products.map((product) => product.category.name.toString()))
      ),
      colors: Array.from(
        new Set<string>(products.map((product) => product.color.name.toString()))
      )
    };
  }, [products]);

  useEffect(() => {
    dispatch(updateProducts([...products, ...incomingData]));
  }, [incomingData, dispatch, products]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      refetch({});
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [params, refetch]);

  return (
    <main>
      <BillboardsCarousel/>
      <section className=''>
        {products.length > 0
          ? products.map((product, index) => (
              <div
                key={product.id}
                className=''
                ref={products.length === index + 1 ? inViewRef : undefined}>
                <div>
                  <TooltipWrapper
                    content={
                      cart.some((item) => item.productId === product.id)
                        ? 'Remove from cart'
                        : 'Add to cart'
                    }>
                    <Button onClick={() => {}}>
                      <ShoppingBagIcon
                        className={clsx({
                          'stroke-primary': cart.some(
                            (item) => item.productId === product.id
                          )
                        })}
                      />
                    </Button>
                  </TooltipWrapper>

                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.images[0].url}
                      width={250}
                      height={250}
                      placeholder='blur'
                      alt={`${product.name} image`}
                    />
                  </Link>
                </div>
                <Link href={`/products/${product.id}`} className='product-details'>
                  <span className='actual-price'>
                    {currencyFormatter(product.price)}
                  </span>

                  <h3>
                    <span>
                      {product.name.length > 40
                        ? product.name.slice(0, 40) + '...'
                        : product.name}{' '}
                    </span>
                  </h3>
                </Link>
              </div>
            ))
          : null}

        {products.length < 0 && !isError && !isLoading ? (
          <EmptyMessage icon={LayoutDashboardIcon} message='No products to show yet.' />
        ) : null}

        {isError && !isLoading ? (
          <EmptyMessage
            icon={AlertTriangleIcon}
            message='Failed to fetch products data. Please check your internet connection and try again.'
          />
        ) : null}

        {!isError && isLoading ? (
          <EmptyMessage
            icon={LoaderIcon}
            message='Loading products data, please wait.'
          />
        ) : null}
      </section>
    </main>
  );
}
