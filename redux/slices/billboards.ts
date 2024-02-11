import { Billboard } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: Billboard[] = [];

const billboardsSlice = createSlice({
  name: 'billboards',
  initialState,
  reducers: {
    updateBillboards: (state, action: PayloadAction<Billboard[]>) => {
      state = action.payload;
      return state;
    }
  }
});

export const { updateBillboards } = billboardsSlice.actions;
export default billboardsSlice.reducer;
