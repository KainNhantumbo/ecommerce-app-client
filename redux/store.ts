'use client';

export { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import productReducer from '@/redux/slices/products';
import cartReducer from '@/redux/slices/cart';
import billboardReducer from '@/redux/slices/billboards';
import usersReducer from '@/redux/slices/users';
import modalsReducer from '@/redux/slices/modals';
import ordersReducer from '@/redux/slices/orders';
import publicProductReducer from './slices/public-products';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    billboards: billboardReducer,
    modals: modalsReducer,
    users: usersReducer,
    orders: ordersReducer,
    publicProducts: publicProductReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
