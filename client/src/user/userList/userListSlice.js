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
  page: 1,
  view: '',
  reachEnd: false,
};

const getAll = createAsyncThunk('userList/getAll', async (view, thunkAPI) => {
  const [name, param] = view.split(/=(.*)/s);
  const { page, datetime } = thunkAPI.getState().userList;
  const payload = { param, datetime, page };
  switch (name) {
    case 'getAllUsers':
      return thunkAPI.dispatch(getAllUsers(payload));
    case 'getAllFollows':
      return thunkAPI.dispatch(getAllFollows(payload));
    default:
      console.log('Wrong view');
  }
});

const getAllUsers = createAsyncThunk(
  'userList/getAllUsers',
  async ({ param, datetime, page }, thunkAPI) => {
    const query = !param ? '' : `q=${param}&`;
    return thunks.get(
      `/users?${query}before=${datetime}&page=${page}`,
      thunkAPI
    );
  }
);

const getAllFollows = createAsyncThunk(
  'userList/getAllFollows',
  async ({ param, page }, thunkAPI) => {
    const query = !param ? '' : `q=${param}&`;
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
        let index = state.data.findIndex((u) => u.username > username);
        index = index === -1 ? state.data.length : index;
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
