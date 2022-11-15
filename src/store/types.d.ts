import { SearchState } from '@slices/search/types';
import { SettingsState } from '@slices/settings/types';

import { tatoebaApi } from '@services/tatoebaApi';

export interface RootReducerState {
  search: SearchState;
  settings: SettingsState;
  [tatoebaApi.reducerPath]: tatoebaApi.reducer;
}
