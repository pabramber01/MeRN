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
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(getAllUsers), reducers.pendingList)
      .addMatcher(isFulfilled(getAllUsers), reducers.fullfilledList)
      .addMatcher(isRejectedWithValue(getAllUsers), reducers.rejectNoLoading);
  },
});

export { getAll };
export const { changeView, changeEnabled } = userListSlice.actions;
export default userListSlice.reducer;
