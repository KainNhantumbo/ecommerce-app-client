'use client';

export { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import productReducer from '@/redux/slices/products';
import cartReducer from '@/redux/slices/cart';
import createBillboardReducer from '@/redux/slices/create-billboard';
import billboardReducer from '@/redux/slices/billboards';
import modalsReducer from '@/redux/slices/modals'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    createBillboard: createBillboardReducer,
    billboards: billboardReducer,
    modals: modalsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
