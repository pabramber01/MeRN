import { thunks } from '../../utils';
import { toast } from 'react-toastify';
import {
  createAsyncThunk,
  createSlice,
  isPending,
  isFulfilled,
  isRejectedWithValue,
} from '@reduxjs/toolkit';

const initialState = {
  feed: [],
  page: 0,
  view: '',
  reachEnd: false,
};

const getAll = createAsyncThunk(
  'publicationList/getAll',
  async (view, thunkAPI) => {
    switch (true) {
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
  async (_, thunkAPI) =>
    thunks.get(
      `/publications?page=${thunkAPI.getState().publicationList.page}`,
      thunkAPI
    )
);

const getAllPublicationsByUser = createAsyncThunk(
  'publicationList/getAllPublicationsByUser',
  async (username, thunkAPI) =>
    thunks.get(
      `/users/${username}/publications?page=${
        thunkAPI.getState().publicationList.page
      }`,
      thunkAPI
    )
);

const publicationListSlice = createSlice({
  name: 'publicationList',
  initialState,
  reducers: {
    changeView: (_, { payload }) => {
      const { page } = payload;
      return { ...initialState, view: page };
    },
    clearFeed: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isPending(getAllPublications, getAllPublicationsByUser),
        (state) => {
          state.page += 1;
        }
      )
      .addMatcher(
        isFulfilled(getAllPublications, getAllPublicationsByUser),
        (state, { payload }) => {
          const { data } = payload;
          if (data.length === 0 && !state.reachEnd) {
            state.reachEnd = true;
            if (state.page > 1) {
              toast.warn('You have reached the end!');
            }
          } else {
            state.feed.push(...data);
          }
        }
      )
      .addMatcher(isRejectedWithValue(getAllPublications), (_, { payload }) => {
        const { msg } = payload;
        toast.error(msg);
      });
  },
});

export { getAll };
export const { changeView, clearFeed } = publicationListSlice.actions;
export default publicationListSlice.reducer;
