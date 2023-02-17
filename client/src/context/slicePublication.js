import { thunks } from '../utils';
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
  isLoading: false,
};

const getAll = createAsyncThunk(
  'publication/getAll',
  async (view, thunkAPI) => {
    switch (true) {
      case view.startsWith('home'):
        thunkAPI.dispatch(getAllPublications());
        break;
      case view.startsWith('profile'):
        thunkAPI.dispatch(getAllPublicationsByUser(view.split('/')[1]));
        break;
      default:
        console.log('Wrong view');
    }
  }
);

const getAllPublications = createAsyncThunk(
  'publication/getAllPublications',
  async (_, thunkAPI) =>
    thunks.get(
      `/publications?page=${thunkAPI.getState().publication.page}`,
      thunkAPI
    )
);

const getAllPublicationsByUser = createAsyncThunk(
  'publication/getAllPublicationsByUser',
  async (username, thunkAPI) =>
    thunks.get(
      `/users/${username}/publications?page=${
        thunkAPI.getState().publication.page
      }`,
      thunkAPI
    )
);

const publicationSlice = createSlice({
  name: 'publication',
  initialState,
  reducers: {
    changeView: (_, { payload }) => {
      const { page } = payload;
      return { ...initialState, view: page };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isPending(getAllPublications, getAllPublicationsByUser),
        (state) => {
          state.page += 1;
          state.isLoading = true;
        }
      )
      .addMatcher(
        isFulfilled(getAllPublications, getAllPublicationsByUser),
        (state, { payload }) => {
          const { data } = payload;
          if (data.length === 0 && !state.reachEnd) {
            state.reachEnd = true;
            toast.warn('You have reached the end!');
          } else {
            state.feed.push(...data);
          }
          state.isLoading = false;
        }
      )
      .addMatcher(
        isRejectedWithValue(getAllPublications, getAllPublicationsByUser),
        (state, { payload }) => {
          const { msg } = payload;
          state.isLoading = false;
          toast.error(msg);
        }
      );
  },
});

export { getAll };
export const { changeView } = publicationSlice.actions;
export default publicationSlice.reducer;
