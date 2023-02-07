import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { loginUserThunk, logoutUserThunk, createUserThunk } from '.';
import {
  getUserFromLocalStorage,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils';

const initialState = {
  user: getUserFromLocalStorage(),
  isLoading: false,
};

const loginUser = createAsyncThunk('user/loginUser', async (user, thunkAPI) =>
  loginUserThunk('/auth/login', user, thunkAPI)
);

const logoutUser = createAsyncThunk('user/logoutUser', async (_, thunkAPI) =>
  logoutUserThunk('/auth/logout', thunkAPI)
);

const createUser = createAsyncThunk('user/createUser', async (user, thunkAPI) =>
  createUserThunk('/users', user, thunkAPI)
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { data } = payload;
        state.isLoading = false;
        state.user = data.user;
        addUserToLocalStorage(data.user);
        toast.success(`Welcome, ${data.user.username}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        const { msg } = payload;
        state.isLoading = false;
        toast.error(msg);
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        const { data } = payload;
        state.isLoading = false;
        state.user = null;
        removeUserFromLocalStorage();
        toast.success(data.msg);
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        const { msg } = payload;
        state.isLoading = false;
        toast.error(msg);
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        const { data } = payload;
        state.isLoading = false;
        state.user = data.user;
        addUserToLocalStorage(data.user);
        toast.success(`Welcome, ${data.user.username}`);
      })
      .addCase(createUser.rejected, (state, { payload }) => {
        const { msg } = payload;
        state.isLoading = false;
        toast.error(msg);
      });
  },
});

export { loginUser, logoutUser, createUser };
// export const {} = userSlice.actions;
export default userSlice.reducer;
