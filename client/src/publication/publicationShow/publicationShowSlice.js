import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
  isFulfilled,
} from '@reduxjs/toolkit';
import { reducers, thunks } from '../../utils';

const initialState = {
  publication: {},
};

const getPublication = createAsyncThunk(
  'publicationShow/getPublication',
  async (publicationId, thunkAPI) =>
    thunks.get(`/publications/${publicationId}`, thunkAPI)
);

const publicationShowSlice = createSlice({
  name: 'publicationShow',
  initialState,
  reducers: {
    clearPublication: () => reducers.clear(initialState),
    changeLiked: (state) => {
      const isNewLike = !state.publication.isLiked;
      state.publication.isLiked = isNewLike;
      state.publication.numLikes += isNewLike ? +1 : -1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isFulfilled(getPublication), (state, { payload }) => {
        const { data } = payload;
        state.publication = data;
      })
      .addMatcher(
        isRejectedWithValue(getPublication),
        reducers.rejectNoLoading
      );
  },
});

export { getPublication };
export const { clearPublication, changeLiked } = publicationShowSlice.actions;
export default publicationShowSlice.reducer;
