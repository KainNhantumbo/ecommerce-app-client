'use client';

import { Order } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: Order[] = [];

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    updateOrders: (state, action: PayloadAction<Order[]>) => {
      state = action.payload;
      return state;
    }
  }
});

export const { updateOrders } = orderSlice.actions;
export default orderSlice.reducer;
