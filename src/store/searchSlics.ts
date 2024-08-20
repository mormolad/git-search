import { createSlice } from '@reduxjs/toolkit';
interface SearchState {
  search: {};
  isLoad: boolean;
  page: number;
  perPage: number;
  wordSearch: string;
  quntityRepositories: number;
  sortColum: string;
}
type RepositoryData = {
  id: number;
  name: string;
  language: string | null;
  forks: number;
  stars: number;
  date: string;
};

const searchSlics = createSlice({
  name: 'isSearch',
  initialState: {
    search: [],
    isLoad: false,
    page: 1,
    perPage: 5,
    wordSearch: '',
    quntityRepositories: 0,
    sortColum: 'name',
    
  } as SearchState,
  reducers: {
    setSearch(state: SearchState, payload: { payload: RepositoryData[] }) {
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
    setWordSearch(state: SearchState, payload: { payload: string }) {
      state.wordSearch = payload.payload;
    },
    setQuntityRepositories(state: SearchState, payload: { payload: number }) {
      state.quntityRepositories = payload.payload;
    },
    setSortColum(state: SearchState, payload: { payload: string }) {
      state.sortColum = payload.payload;
    },
  },
});

export default searchSlics.reducer;
export const {
  setSearch,
  setIsLoad,
  setPage,
  setPerPage,
  setWordSearch,
  setQuntityRepositories,
  setSortColum,
} = searchSlics.actions;
