import { xor } from 'lodash';
import { LanguageCode } from '@constants/languages';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchParameters } from '@interfaces/search';
import { SearchState } from './types';

const page = 1;
const query = '';
const to: LanguageCode = '';
const from: LanguageCode = '';

const initialSearchParams = { page, query, to, from };

const initialState: SearchState = {
  favoriteLanguages: [],
  currentSearchParams: initialSearchParams,
  submittedSearchParams: initialSearchParams,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCurrentSearchParams(state, { payload }: PayloadAction<Partial<SearchParameters>>) {
      state.currentSearchParams = { ...state.currentSearchParams, ...payload };
    },
    submitSearchParams(state) {
      state.submittedSearchParams = {
        ...state.currentSearchParams,
        query: state.currentSearchParams.query.trim(),
      };
    },
    toggleFavoriteLanguage(state, { payload }: PayloadAction<LanguageCode>) {
      state.favoriteLanguages = xor(state.favoriteLanguages, [payload]);
    },
  },
});

export const {
  submitSearchParams,
  setCurrentSearchParams,
  toggleFavoriteLanguage,
} = searchSlice.actions;

export default searchSlice.reducer;
