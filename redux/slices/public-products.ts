import { PublicProduct } from '@/hooks/query-products-hook';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: PublicProduct[] = [];

const publicProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updatePublicProducts: (state, action: PayloadAction<PublicProduct[]>) => {
      state = action.payload;
      return state;
    }
  }
});

export const { updatePublicProducts } = publicProductSlice.actions;
export default publicProductSlice.reducer;
