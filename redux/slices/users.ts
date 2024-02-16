import { User } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: User[] = [];

const userSlice = createSlice({
  initialState,
  name: 'users',
  reducers: {
    updateUsers: (state, action: PayloadAction<User[]>) => {
      state = action.payload;
      return state;
    }
  }
});

export const { updateUsers } = userSlice.actions;
export default userSlice.reducer;
