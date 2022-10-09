import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import search from '@slices/search';
import settings from '@slices/settings';
import { tatoebaApi } from '@services/tatoebaApi';

import { RootReducerState } from './types';

const reducers = combineReducers({
  search,
  settings,
  [tatoebaApi.reducerPath]: tatoebaApi.reducer,
});

const persistedReducer = persistReducer<RootReducerState, AnyAction>(
  {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
    blacklist: [tatoebaApi.reducerPath],
  },
  reducers,
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(tatoebaApi.middleware),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
