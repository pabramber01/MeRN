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
} from '../../utils';

const initialState = {
  currentUser: getUserFromLocalStorage(),
  isLoading: false,
};

const loginUser = createAsyncThunk(
  'authForm/loginUser',
  async (user, thunkAPI) => thunks.post('/auth/login', user, thunkAPI)
);

const logoutUser = createAsyncThunk(
  'authForm/logoutUser',
  async (_, thunkAPI) => thunks.get('/auth/logout', thunkAPI)
);

const createUser = createAsyncThunk(
  'authForm/createUser',
  async (user, thunkAPI) => thunks.post('/users', user, thunkAPI)
);

const authFormSlice = createSlice({
  name: 'authForm',
  initialState,
  reducers: {
    loadCurrentUser: (state) => {
      state.currentUser = getUserFromLocalStorage();
    },
    logoutUserLocal: (state, { payload }) => {
      state.currentUser = null;
      removeUserFromLocalStorage();
      if (payload) toast.success(payload);
      else toast.warn('Session expired, logging out...');
    },
  },
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
      .addMatcher(isRejectedWithValue(loginUser, createUser), (state) => {
        state.isLoading = false;
      })
      .addMatcher(
        isRejectedWithValue(loginUser, createUser, logoutUser),
        (_, { payload }) => {
          const { msg } = payload;
          toast.error(msg);
        }
      );
  },
});

export { loginUser, logoutUser, createUser };
export const { loadCurrentUser, logoutUserLocal } = authFormSlice.actions;
export default authFormSlice.reducer;
