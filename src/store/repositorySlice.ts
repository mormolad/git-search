import { createSlice } from '@reduxjs/toolkit';
interface SearchState {
    repositoryInfo: {}
}
type RepositoryData = {
    name: string;
    discription: string | null;
    license: string;
  };

const repositorySlice = createSlice({
  name: 'isRepositoryInfo',
  initialState: {
    repositoryInfo: {},
  } as SearchState,
  reducers: {
    setRepositoryInfo(
      state: SearchState,
      payload: { payload: RepositoryData[] }
    ) {
      state.repositoryInfo = payload.payload;
    },
  },
});

export default repositorySlice.reducer;
export const { setRepositoryInfo } = repositorySlice.actions;
