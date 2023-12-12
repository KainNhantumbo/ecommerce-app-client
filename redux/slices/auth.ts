import { Auth } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: Auth = { id: Number(), email: '', name: '', token: '' };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuth: (state, action: PayloadAction<Auth>) => {
      state = action.payload;
      return state;
    }
  }
});

export const { updateAuth } = authSlice.actions;
export default authSlice.reducer;
