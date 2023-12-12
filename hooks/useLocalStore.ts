'use client';

import { CartItem } from '@/types';
import { updateCart } from '@/redux/slices/cart';
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const useAutoSyncCartStore = () => {
  const STORE_KEY = 'CART';
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);

  const syncCartToLocalStorage = () => {
    localStorage.setItem(STORE_KEY, JSON.stringify(cart));
  };

  const restoreCartFromLocalStorage = () => {
    const data: CartItem[] = JSON.parse(
      localStorage.getItem(STORE_KEY) || `[]`
    );

    if (data.length > 0) dispatch(updateCart([...cart, ...data]));
  };

  useEffect(() => {
    syncCartToLocalStorage();
  }, [cart]);

  useLayoutEffect(() => {
    restoreCartFromLocalStorage();
  }, []);
};
