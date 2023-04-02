import { reducers, thunks } from '../../utils';
import {
  createAsyncThunk,
  createSlice,
  isPending,
  isFulfilled,
  isRejectedWithValue,
} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  datetime: '',
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
    case view.startsWith('follows-search'):
      return thunkAPI.dispatch(getAllFollows(view.split('/')[1]));
    case view.startsWith('follows'):
      return thunkAPI.dispatch(getAllFollows());
    default:
      console.log('Wrong view');
  }
});

const getAllUsers = createAsyncThunk(
  'userList/getAllUsers',
  async (query, thunkAPI) => {
    const { page, datetime } = thunkAPI.getState().userList;
    query = !query ? '' : `q=${query}&`;
    return thunks.get(
      `/users?${query}before=${datetime}&page=${page}`,
      thunkAPI
    );
  }
);

const getAllFollows = createAsyncThunk(
  'userList/getAllFollows',
  async (query, thunkAPI) => {
    const { page } = thunkAPI.getState().userList;
    query = !query ? '' : `q=${query}&`;
    return thunks.get(`/users/own/follows?${query}page=${page}`, thunkAPI);
  }
);

const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    changeView: (_, { payload }) =>
      reducers.changeViewList(initialState, payload),
    changeEnabled: (state, { payload }) => {
      const { username } = payload;
      const index = state.data.findIndex((u) => u.username === username);
      state.data[index].enabled = !state.data[index].enabled;
    },
    changeFollowList: (state, { payload }) => {
      const { isFollowing } = payload;
      const isNewFollow = isFollowing != null && !isFollowing;
      if (isNewFollow) {
        const { _id, username, avatar } = payload;
        const index = state.data.findIndex((u) => u.username > username);
        state.data.splice(index, 0, { _id, username, avatar });
      } else {
        const { username } = payload;
        const index = state.data.findIndex((u) => u.username === username);
        state.data.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(getAllUsers, getAllFollows), reducers.pendingList)
      .addMatcher(
        isFulfilled(getAllUsers, getAllFollows),
        reducers.fullfilledList
      )
      .addMatcher(
        isRejectedWithValue(getAllUsers, getAllFollows),
        reducers.rejectNoLoading
      );
  },
});

export { getAll };
export const { changeView, changeEnabled, changeFollowList } =
  userListSlice.actions;
export default userListSlice.reducer;
