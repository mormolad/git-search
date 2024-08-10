import { configureStore } from '@reduxjs/toolkit';
import reduserLang from './searchSlics';

export const store = () => {
  return configureStore({
    reducer: {
      reduserLang,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
