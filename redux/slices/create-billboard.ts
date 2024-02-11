import { CreateBillboard } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: CreateBillboard = { id: '', label: '', image: '' };

const createBillboardSlice = createSlice({
  name: 'billboards',
  initialState,
  reducers: {
    updateBillboardData: (state, action: PayloadAction<CreateBillboard>) => {
      state = action.payload;
      return state;
    }
  }
});

export const { updateBillboardData } = createBillboardSlice.actions;
export default createBillboardSlice.reducer;
