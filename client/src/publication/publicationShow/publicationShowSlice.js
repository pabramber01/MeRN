import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
  isFulfilled,
  isPending,
} from '@reduxjs/toolkit';
import { reducers, thunks } from '../../utils';

const initialState = {
  publication: {},
  isLoading: false,
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
      .addMatcher(isPending(getPublication), reducers.pending)
      .addMatcher(isFulfilled(getPublication), (state, { payload }) => {
        const { data } = payload;
        state.publication = data;
        state.isLoading = false;
      })
      .addMatcher(isRejectedWithValue(getPublication), (state, { payload }) => {
        const id = 'pub' + payload.msg.split(' ').pop().replaceAll("'", '');
        reducers.rejectOneMsg(state, { payload }, id);
      });
  },
});

export { getPublication };
export const { clearPublication, changeLiked } = publicationShowSlice.actions;
export default publicationShowSlice.reducer;
