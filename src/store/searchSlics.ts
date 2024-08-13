import { createSlice } from '@reduxjs/toolkit';
interface SearchState {
  search: {};
  isLoad: boolean;
  page: number;
  perPage: number;
}

const searchSlics = createSlice({
  name: 'isSearch',
  initialState: {
    search: {},
    isLoad: false,
    page: 0,
    perPage: 50,
  } as SearchState,
  reducers: {
    setSearch(state: SearchState, payload: { payload: {} }) {
      state.search = payload.payload;
    },
    setIsLoad(state: SearchState, payload: { payload: boolean }) {
      state.isLoad = payload.payload;
    },
    setPage(state: SearchState, payload: { payload: number }) {
      state.page = payload.payload;
    },
    setPerPage(state: SearchState, payload: { payload: number }) {
      state.perPage = payload.payload;
    },
  },
});

export default searchSlics.reducer;
export const { setSearch, setIsLoad, setPage, setPerPage } =
  searchSlics.actions;
