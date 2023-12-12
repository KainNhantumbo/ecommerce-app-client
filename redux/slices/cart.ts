import { CartItem } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCart: (state, action: PayloadAction<CartItem[]>) => {
      state = action.payload;
      return state;
    }
  }
});

export default cartSlice.reducer;
export const { updateCart } = cartSlice.actions;
