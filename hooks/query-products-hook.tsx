'use client';

import httpClient from '@/config/http-client';
import { updateProducts } from '@/redux/slices/products';
import type { AppDispatch, RootState } from '@/redux/store';
import { PRODUCTS_LIMIT_PER_PAGE } from '@/shared/constants';
import type { Product } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';

export const useQueryProducts = () => {
  const { ref: inViewRef, inView } = useInView();

  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products);
  const params = useSearchParams();

  const { data, refetch, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery({
      initialPageParam: 0,
      queryKey: ['public-products'],
      queryFn: async ({ pageParam = 0 }) => {
        const queryParams = new URLSearchParams({
          search: params.get('search') || '',
          offset: params.get('offset') || String(pageParam * PRODUCTS_LIMIT_PER_PAGE),
          limit: params.get('limit') || String(PRODUCTS_LIMIT_PER_PAGE),
          category: params.get('category') || '',
          color: params.get('color') || '',
          featured: params.get('featured') || '',
          sort: params.get('sort') || '',
          size: params.get('size') || ''
        });

        const { data } = await httpClient<Product[]>({
          method: 'get',
          url: `/api/v1/products?${queryParams.toString()}`
        });

        return { data, currentOffset: pageParam + 1 };
      },
      getNextPageParam: ({ data, currentOffset }) =>
        data.length >= PRODUCTS_LIMIT_PER_PAGE ? currentOffset : undefined
    });

  const newProductsData = useMemo((): Product[] => {
    if (data)
      return data.pages
        .map(({ data: products }) => products)
        .reduce((accumulator, currentObj) => [...accumulator, ...currentObj]);
    return [];
  }, [data]);

  useEffect(() => {
    dispatch(updateProducts([...newProductsData]));
  }, [newProductsData]);

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => refetch(), 500);
    return () => clearTimeout(debounceTimer);
  }, [params, refetch]);

  return {
    products,
    refetch,
    inViewRef,
    isError,
    isLoading,
    hasNextPage,
    error
  };
};
