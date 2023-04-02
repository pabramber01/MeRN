import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
  isFulfilled,
} from '@reduxjs/toolkit';
import { reducers, thunks } from '../../utils';

const initialState = {
  userProfile: {},
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
      const changeNum = notPayload || isSame;

      const isNewFollow = !state.userProfile.isFollowing;
      state.userProfile.isFollowing = isNewFollow;
      if (changeNum) state.userProfile.numFollowers += isNewFollow ? +1 : -1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isFulfilled(getUserProfile), (state, { payload }) => {
        const { data } = payload;
        state.userProfile = data;
      })
      .addMatcher(
        isRejectedWithValue(getUserProfile),
        reducers.rejectNoLoading
      );
  },
});

export { getUserProfile };
export const { changeFollowShow } = userShowSlice.actions;
export default userShowSlice.reducer;
