import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejectedWithValue,
  isFulfilled,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getUserFromLocalStorage,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  thunks,
} from '../utils';

const initialState = {
  currentUser: getUserFromLocalStorage(),
  isLoading: false,
  userProfile: {},
};

const loginUser = createAsyncThunk('user/loginUser', async (user, thunkAPI) =>
  thunks.post('/auth/login', user, thunkAPI)
);

const logoutUser = createAsyncThunk('user/logoutUser', async (_, thunkAPI) =>
  thunks.get('/auth/logout', thunkAPI)
);

const createUser = createAsyncThunk('user/createUser', async (user, thunkAPI) =>
  thunks.post('/users', user, thunkAPI)
);

const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (username, thunkAPI) => thunks.get(`/users/${username}`, thunkAPI)
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeProfile: (state) => {
      state.userProfile = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isPending(loginUser, logoutUser, createUser, getUserProfile),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(isFulfilled(loginUser, createUser), (state, { payload }) => {
        const { data } = payload;
        state.isLoading = false;
        state.currentUser = data.user;
        addUserToLocalStorage(data.user);
        toast.success(`Welcome, ${data.user.username}`);
      })
      .addMatcher(isFulfilled(logoutUser), (state, { payload }) => {
        const { data } = payload;
        state.isLoading = false;
        state.currentUser = null;
        removeUserFromLocalStorage();
        toast.success(data.msg);
      })
      .addMatcher(isFulfilled(getUserProfile), (state, { payload }) => {
        const { data } = payload;
        state.isLoading = false;
        state.userProfile = data;
      })
      .addMatcher(
        isRejectedWithValue(loginUser, logoutUser, createUser, getUserProfile),
        (state, { payload }) => {
          const { msg } = payload;
          state.isLoading = false;
          toast.error(msg);
        }
      );
  },
});

export { loginUser, logoutUser, createUser, getUserProfile };
export const { changeProfile } = userSlice.actions;
export default userSlice.reducer;
