import { updateCart } from '@/redux/slices/cart';
import { AppDispatch, RootState } from '@/redux/store';
import { CartItem } from '@/types';
import { useDispatch, useSelector } from 'react-redux';

export const useCartManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);

  const removeCartItem = (productId: number) => {
    dispatch(updateCart([...cart.filter((item) => item.productId !== productId)]));
  };

  const addCartItem = (item: CartItem) => {
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
    cart,
    dispatch,
    decreaseQuantity,
    updateCart
  };
};
