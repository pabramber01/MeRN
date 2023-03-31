import { thunks } from '../../utils';
import { toast } from 'react-toastify';
import {
  createAsyncThunk,
  createSlice,
  isPending,
  isFulfilled,
  isRejectedWithValue,
} from '@reduxjs/toolkit';

const initialState = {
  users: [],
  page: 0,
  view: '',
  reachEnd: false,
};

const getAll = createAsyncThunk('userList/getAll', async (view, thunkAPI) => {
  switch (true) {
    case view.startsWith('admin-search'):
      return thunkAPI.dispatch(getAllUsers(view.split('/')[1]));
    case view.startsWith('admin'):
      return thunkAPI.dispatch(getAllUsers());
    default:
      console.log('Wrong view');
  }
});

const getAllUsers = createAsyncThunk(
  'userList/getAllUsers',
  async (query, thunkAPI) => {
    query = !query ? '' : `&q=${query}`;
    return thunks.get(
      `/users?page=${thunkAPI.getState().userList.page}${query}`,
      thunkAPI
    );
  }
);

const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    changeView: (_, { payload }) => {
      const { page } = payload;
      return { ...initialState, view: page };
    },
    changeEnabled: (state, { payload }) => {
      const { username } = payload;
      const index = state.users.findIndex((u) => u.username === username);
      state.users[index].enabled = !state.users[index].enabled;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(getAllUsers), (state) => {
        state.page += 1;
      })
      .addMatcher(isFulfilled(getAllUsers), (state, { payload }) => {
        const { data } = payload;
        if (data.length === 0 && !state.reachEnd) {
          state.reachEnd = true;
          if (state.page > 1) {
            toast.warn('You have reached the end!');
          }
        } else {
          state.users.push(...data);
        }
      })
      .addMatcher(isRejectedWithValue(getAllUsers), (_, { payload }) => {
        const { msg } = payload;
        toast.error(msg);
      });
  },
});

export { getAll };
export const { changeView, changeEnabled } = userListSlice.actions;
export default userListSlice.reducer;
