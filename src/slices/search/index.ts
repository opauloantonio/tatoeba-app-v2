import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchState } from './types';

const initialState: SearchState = {
  query: '',
  page: 1,
  from: 'und',
  to: 'und',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchText(state, { payload }: PayloadAction<string>) {
      state.query = payload;
    },
  },
});

export const { setSearchText } = searchSlice.actions;

export default searchSlice.reducer;
