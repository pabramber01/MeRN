import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
  isFulfilled,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { thunks } from '../../utils';

const initialState = {
  userProfile: {},
};

const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (username, thunkAPI) => thunks.get(`/users/${username}`, thunkAPI)
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isFulfilled(getUserProfile), (state, { payload }) => {
        const { data } = payload;
        state.userProfile = data;
      })
      .addMatcher(isRejectedWithValue(getUserProfile), (_, { payload }) => {
        const { msg } = payload;
        toast.error(msg);
      });
  },
});

export { getUserProfile };
// export const {} = userSlice.actions;
export default userSlice.reducer;
