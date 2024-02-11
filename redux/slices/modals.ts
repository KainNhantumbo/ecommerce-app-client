import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isBillboardImagePreviewerOpen: false,
  isBillboardEditorOpen: false
};

export const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleBillboardImagePreviewer: (state) => {
      return {
        ...state,
        isBillboardImagePreviewerOpen: !state.isBillboardImagePreviewerOpen
      };
    },
    toggleBillboardEditor: (state) => {
      return {
        ...state,
        isBillboardEditorOpen: !state.isBillboardEditorOpen
      };
    }
  }
});

export const { toggleBillboardEditor, toggleBillboardImagePreviewer } =
  modalSlice.actions;
export default modalSlice.reducer;
