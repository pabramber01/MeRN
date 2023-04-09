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
  page: 1,
  view: '',
  reachEnd: false,
};

const getAll = createAsyncThunk(
  'publicationList/getAll',
  async (view, thunkAPI) => {
    const [name, param] = view.split(/=(.*)/s);
    const { page, datetime } = thunkAPI.getState().publicationList;
    const payload = { param, datetime, page };
    switch (name) {
      case 'getAllPublications':
        return thunkAPI.dispatch(getAllPublications(payload));
      case 'getAllPublicationsByUser':
        return thunkAPI.dispatch(getAllPublicationsByUser(payload));
      default:
        console.log('Wrong view');
    }
  }
);

const getAllPublications = createAsyncThunk(
  'publicationList/getAllPublications',
  async ({ param, datetime, page }, thunkAPI) => {
    const query = !param ? '' : `q=${param}&`;
    return thunks.get(
      `/publications?${query}before=${datetime}&page=${page}`,
      thunkAPI
    );
  }
);

const getAllPublicationsByUser = createAsyncThunk(
  'publicationList/getAllPublicationsByUser',
  async ({ param, datetime, page }, thunkAPI) => {
    return thunks.get(
      `/users/${param}/publications?before=${datetime}&page=${page}`,
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
