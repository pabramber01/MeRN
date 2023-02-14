import {
  createAsyncThunk,
  createSlice,
  isPending,
  isFulfilled,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import { getAllThunk, getAllPublicationsThunk } from '.';
import { toast } from 'react-toastify';

const initialState = {
  feed: [],
  page: 0,
  view: '',
  reachEnd: false,
};

const getAll = createAsyncThunk(
  'publication/getAll',
  async (view, thunkAPI) => {
    return getAllThunk(view, thunkAPI);
  }
);

const getAllPublications = createAsyncThunk(
  'publication/getAllPublications',
  async (_, thunkAPI) => {
    const { page } = thunkAPI.getState().publication;
    return getAllPublicationsThunk(`/publications?page=${page}`, thunkAPI);
  }
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
      .addMatcher(isPending(getAllPublications), (state) => {
        state.page += 1;
      })
      .addMatcher(isFulfilled(getAllPublications), (state, { payload }) => {
        const { data } = payload;
        if (data.length === 0 && !state.reachEnd) {
          state.reachEnd = true;
          toast.warn('You have reached the end!');
        } else {
          state.feed.push(...data);
        }
      })
      .addMatcher(
        isRejectedWithValue(getAllPublications),
        (state, { payload }) => {
          const { msg } = payload;
          toast.error(msg);
        }
      );
  },
});

export { getAll, getAllPublications };
export const { changeView } = publicationSlice.actions;
export default publicationSlice.reducer;
