import { configureStore } from '@reduxjs/toolkit';
import reduserSearch from './searchSlics';

export const store = () => {
  return configureStore({
    reducer: {
      reduserSearch,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
