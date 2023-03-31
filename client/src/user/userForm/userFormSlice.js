import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
  isFulfilled,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { thunks } from '../../utils';
import { addUserToLocalStorage } from '../../utils';

const initialState = {
  user: {},
};

const getUserData = createAsyncThunk(
  'userForm/getUserData',
  async (_, thunkAPI) => thunks.get(`/users/own`, thunkAPI)
);

const updateUser = createAsyncThunk(
  'userForm/updateUser',
  async (user, thunkAPI) => thunks.patch('/users/own/', user, thunkAPI)
);

const updatePassword = createAsyncThunk(
  'userForm/updatePassword',
  async (passwords, thunkAPI) =>
    thunks.patch(`/users/own/change-password`, passwords, thunkAPI)
);

const deleteUser = createAsyncThunk(
  'userForm/deleteUser',
  async (_, thunkAPI) => thunks.delete(`/users/own`, thunkAPI)
);

const banUser = createAsyncThunk('userForm/banUser', async (id, thunkAPI) =>
  thunks.patch(`/users/${id}/ban`, null, thunkAPI)
);

const unbanUser = createAsyncThunk('userForm/unbanUser', async (id, thunkAPI) =>
  thunks.patch(`/users/${id}/unban`, null, thunkAPI)
);

const userFormSlice = createSlice({
  name: 'userForm',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isFulfilled(getUserData), (state, { payload }) => {
        const { data } = payload;
        state.user.username = data.username;
        state.user.email = data.email;
        state.user.avatar = data.avatar;
      })
      .addMatcher(isFulfilled(updateUser), (state, { payload }) => {
        const { data } = payload;
        state.user = {};
        addUserToLocalStorage(data.user);
        toast.success('Your account has been updated successfully!');
      })
      .addMatcher(isFulfilled(updatePassword), (state) => {
        toast.success('Your password has been updated successfully!');
      })
      .addMatcher(isFulfilled(deleteUser), (state) => {
        state = initialState;
      })
      .addMatcher(isFulfilled(banUser), () => {
        toast.success('User banned succesfully!');
      })
      .addMatcher(isFulfilled(unbanUser), () => {
        toast.success('User unbanned successfully!');
      })
      .addMatcher(
        isRejectedWithValue(
          getUserData,
          updateUser,
          updatePassword,
          deleteUser,
          banUser,
          unbanUser
        ),
        (_, { payload }) => {
          const { msg } = payload;
          toast.error(msg);
        }
      );
  },
});

export {
  getUserData,
  updateUser,
  updatePassword,
  deleteUser,
  banUser,
  unbanUser,
};
// export const {} = userFormSlice.actions;
export default userFormSlice.reducer;
