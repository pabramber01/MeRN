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
  'publication/getPublication',
  async (publicationId, thunkAPI) =>
    thunks.get(`/publications/${publicationId}`, thunkAPI)
);

const publicationSlice = createSlice({
  name: 'publication',
  initialState,
  reducers: {},
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
// export const {} = authSlice.actions;
export default publicationSlice.reducer;
