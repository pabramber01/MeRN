import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
  isFulfilled,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { thunks } from '../../utils';

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
    clearPublication: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isFulfilled(getPublication), (state, { payload }) => {
        const { data } = payload;
        state.publication = data;
      })
      .addMatcher(isRejectedWithValue(getPublication), (_, { payload }) => {
        const { msg } = payload;
        toast.error(msg);
      });
  },
});

export { getPublication };
export const { clearPublication } = publicationShowSlice.actions;
export default publicationShowSlice.reducer;
