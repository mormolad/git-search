import { configureStore } from '@reduxjs/toolkit';
import reduserSearch from './searchSlics';
import reduserRepository from './repositorySlice';
export const store = () => {
  return configureStore({
    reducer: {
      reduserSearch,
      reduserRepository,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
