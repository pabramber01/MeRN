import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejectedWithValue,
  isFulfilled,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { thunks } from '../../utils';
import { addUserToLocalStorage } from '../../utils';

const initialState = {
  user: {},
  isLoading: false,
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

const userFormSlice = createSlice({
  name: 'userForm',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isPending(deleteUser, updatePassword, updateUser),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(isFulfilled(getUserData), (state, { payload }) => {
        const { data } = payload;
        state.user.username = data.username;
        state.user.email = data.email;
        state.user.avatar = data.avatar;
      })
      .addMatcher(isFulfilled(updateUser), (state, { payload }) => {
        const { data } = payload;
        state = initialState;
        addUserToLocalStorage(data.user);
        toast.success('Your account has been updated successfully!');
      })
      .addMatcher(isFulfilled(updatePassword), (state) => {
        state.isLoading = false;
        toast.success('Your password has been updated successfully!');
      })
      .addMatcher(isFulfilled(deleteUser), (state) => {
        state = initialState;
      })
      .addMatcher(
        isRejectedWithValue(
          getUserData,
          updateUser,
          updatePassword,
          deleteUser
        ),
        (state, { payload }) => {
          const { msg } = payload;
          state.isLoading = false;
          toast.error(msg);
        }
      );
  },
});

export { getUserData, updateUser, updatePassword, deleteUser };
// export const {} = userFormSlice.actions;
export default userFormSlice.reducer;
