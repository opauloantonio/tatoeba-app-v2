import { createSlice } from '@reduxjs/toolkit';
import { getNextTheme } from '@utils/themes';
import { SettingsState } from './types';

const initialState: SettingsState = {
  theme: 'system',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.theme = getNextTheme(state.theme);
    },
  },
});

export const { changeTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
