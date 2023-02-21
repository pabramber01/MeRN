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
  userProfile: {},
  isLoading: false,
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(loginUser, createUser), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isFulfilled(loginUser, createUser), (state, { payload }) => {
        const { data } = payload;
        state.isLoading = false;
        state.currentUser = data.user;
        addUserToLocalStorage(data.user);
        toast.success(`Welcome, ${data.user.username}`);
      })

      .addMatcher(isFulfilled(logoutUser), (state, { payload }) => {
        const { data } = payload;
        state.currentUser = null;
        removeUserFromLocalStorage();
        toast.success(data.msg);
      })
      .addMatcher(isFulfilled(getUserProfile), (state, { payload }) => {
        const { data } = payload;
        state.userProfile = data;
      })
      .addMatcher(isRejectedWithValue(loginUser, createUser), (state) => {
        state.isLoading = false;
      })
      .addMatcher(
        isRejectedWithValue(loginUser, createUser, logoutUser, getUserProfile),
        (_, { payload }) => {
          const { msg } = payload;
          toast.error(msg);
        }
      );
  },
});

export { loginUser, logoutUser, createUser, getUserProfile };
// export const {} = userSlice.actions;
export default userSlice.reducer;
