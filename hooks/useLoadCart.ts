'use client';

import { updateCart } from '@/redux/slices/cart';
import type { AppDispatch, RootState } from '@/redux/store';
import { CART_STORAGE_KEY } from '@/shared/constants';
import type { CartItem } from '@/types';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export const useLoadCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);
  const restoreCartFromLocalStorage = () => {
    const data: CartItem[] = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || `[]`);

    if (data?.length > 0) dispatch(updateCart([...cart, ...data]));
  };

  const syncCartToLocalStorage = useMemo(
    () => () => {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    },
    [cart]
  );

  useEffect(() => {
    syncCartToLocalStorage();
  }, [cart, syncCartToLocalStorage]);

  useIsomorphicLayoutEffect(() => {
    restoreCartFromLocalStorage();
  }, []);
};
