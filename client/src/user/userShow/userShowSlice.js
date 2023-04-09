import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
  isFulfilled,
  isPending,
} from '@reduxjs/toolkit';
import { reducers, thunks } from '../../utils';

const initialState = {
  userProfile: {},
  isLoading: false,
};

const getUserProfile = createAsyncThunk(
  'userShow/getUserProfile',
  async (username, thunkAPI) => thunks.get(`/users/${username}`, thunkAPI)
);

const userShowSlice = createSlice({
  name: 'userShow',
  initialState,
  reducers: {
    changeFollowShow: (state, { payload }) => {
      const notPayload = !payload;
      const isSame = payload && payload.username === state.userProfile.username;
      const change = notPayload || isSame;

      const isNewFollow = !state.userProfile.isFollowing;

      if (change) {
        state.userProfile.isFollowing = isNewFollow;
        state.userProfile.numFollowers += isNewFollow ? +1 : -1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(getUserProfile), reducers.pending)
      .addMatcher(isFulfilled(getUserProfile), (state, { payload }) => {
        const { data } = payload;
        state.userProfile = data;
        state.isLoading = false;
      })
      .addMatcher(isRejectedWithValue(getUserProfile), reducers.reject);
  },
});

export { getUserProfile };
export const { changeFollowShow } = userShowSlice.actions;
export default userShowSlice.reducer;
