import { FilteredCustomProduct } from '@/app/(admin)/dashboard/products/page';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: FilteredCustomProduct[] = [];

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProducts: (state, action: PayloadAction<FilteredCustomProduct[]>) => {
      state = action.payload;
      return state;
    }
  }
});

export const { updateProducts } = productSlice.actions;
export default productSlice.reducer;
