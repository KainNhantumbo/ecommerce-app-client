'use client';

export { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import productReducer from '@/redux/slices/products';
import cartReducer from '@/redux/slices/cart';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
