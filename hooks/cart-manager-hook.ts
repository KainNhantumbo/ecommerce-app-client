import { updateCart } from '@/redux/slices/cart';
import { AppDispatch, RootState } from '@/redux/store';
import { CartItem, Product } from '@/types';
import { it } from 'node:test';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

export const useCartManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);

  const isInCart = useMemo(
    () => (productId: number) => {
      return cart.some((item) => item.productId === productId);
    },
    [cart]
  );

  const removeCartItem = (productId: number) => {
    if (!isInCart(productId)) return toast.error('Product already removed.');
    dispatch(updateCart([...cart.filter((item) => item.productId !== productId)]));
  };

  const addCartItem = (product: Product) => {
    const item = {
      name: product.name,
      productId: +product.id,
      category: product.category,
      image: product.images[0],
      color: [],
      size: [],
      price: product.price,
      quantity: 1
    };
    if (isInCart(item.productId)) return toast.error('Product already in cart.');
    dispatch(updateCart([...cart, item]));
  };

  const increaseQuantity = (product: CartItem) => {
    dispatch(
      updateCart([
        ...cart.map((item) =>
          item.productId === product.productId
            ? { ...product, quantity: product.quantity + 1 }
            : item
        )
      ])
    );
  };

  const decreaseQuantity = (product: CartItem) => {
    dispatch(
      updateCart([
        ...cart.map((item) =>
          item.productId === product.productId
            ? {
                ...product,
                quantity: product.quantity > 1 ? product.quantity - 1 : product.quantity
              }
            : item
        )
      ])
    );
  };

  const updateQuantity = (productId: number, qty: number) => {
    dispatch(
      updateCart([
        ...cart.map((item) =>
          item.productId === productId ? { ...item, quantity: qty } : item
        )
      ])
    );
  };

  return {
    addCartItem,
    removeCartItem,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    isInCart,
    cart,
    dispatch,
    updateCart
  };
};
