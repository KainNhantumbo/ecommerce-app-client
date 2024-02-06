'use client';

import { updateCart } from '@/redux/slices/cart';
import type { AppDispatch, RootState } from '@/redux/store';
import { CART_STORAGE_KEY } from '@/shared/constants';
import type { CartItem } from '@/types';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useAutoSyncCartStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);
  const [cartValues, updateCartValues] = useLocalStorage<CartItem[]>(
    CART_STORAGE_KEY,
    cart
  );

  useEffect(() => {
    dispatch(updateCart([...cart, ...cartValues]));
  }, [dispatch, cart, cartValues]);

  return { cartItems: cartValues, updateCartItems: updateCartValues };
};
