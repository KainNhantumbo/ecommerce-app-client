import { Product } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: Product[] = [];

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProducts: (state, action: PayloadAction<Product[]>) => {
      state = action.payload;
      return state;
    }
  }
});

export const { updateProducts } = productSlice.actions;
export default productSlice.reducer;
