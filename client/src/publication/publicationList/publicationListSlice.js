import { reducers, thunks } from '../../utils';
import {
  createAsyncThunk,
  createSlice,
  isPending,
  isFulfilled,
  isRejectedWithValue,
} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  datetime: '',
  page: 0,
  view: '',
  reachEnd: false,
};

const getAll = createAsyncThunk(
  'publicationList/getAll',
  async (view, thunkAPI) => {
    switch (true) {
      case view.startsWith('home-search'):
        return thunkAPI.dispatch(getAllPublications(view.split('/')[1]));
      case view.startsWith('home'):
        return thunkAPI.dispatch(getAllPublications());
      case view.startsWith('profile'):
        return thunkAPI.dispatch(getAllPublicationsByUser(view.split('/')[1]));
      default:
        console.log('Wrong view');
    }
  }
);

const getAllPublications = createAsyncThunk(
  'publicationList/getAllPublications',
  async (query, thunkAPI) => {
    const { page, datetime } = thunkAPI.getState().publicationList;
    query = !query ? '' : `q=${query}&`;
    return thunks.get(
      `/publications?${query}before=${datetime}&page=${page}`,
      thunkAPI
    );
  }
);

const getAllPublicationsByUser = createAsyncThunk(
  'publicationList/getAllPublicationsByUser',
  async (username, thunkAPI) => {
    const { page, datetime } = thunkAPI.getState().publicationList;
    return thunks.get(
      `/users/${username}/publications?before=${datetime}&page=${page}`,
      thunkAPI
    );
  }
);

const publicationListSlice = createSlice({
  name: 'publicationList',
  initialState,
  reducers: {
    changeView: (_, { payload }) =>
      reducers.changeViewList(initialState, payload),
    clearFeed: () => reducers.clear(initialState),
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isPending(getAllPublications, getAllPublicationsByUser),
        reducers.pendingList
      )
      .addMatcher(
        isFulfilled(getAllPublications, getAllPublicationsByUser),
        reducers.fullfilledList
      )
      .addMatcher(
        isRejectedWithValue(getAllPublications),
        reducers.rejectNoLoading
      );
  },
});

export { getAll };
export const { changeView, clearFeed } = publicationListSlice.actions;
export default publicationListSlice.reducer;
