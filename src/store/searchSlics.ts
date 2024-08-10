import { createSlice } from '@reduxjs/toolkit';
interface SearchState {
  search: string;
  isLoad: boolean;
}

const searchSlics = createSlice({
  name: 'isSearch',
  initialState: {
    search: 'Eng',
    isLoad: false,
  } as SearchState,
  reducers: {
    setSearch(state: SearchState, payload: { payload: string }) {
      state.search = payload.payload;
    },
    setIsLoad(state: SearchState, payload: { payload: boolean }) {
      state.isLoad = payload.payload;
    },
  },
});

export default searchSlics.reducer;
export const { setSearch, setIsLoad } = searchSlics.actions;
