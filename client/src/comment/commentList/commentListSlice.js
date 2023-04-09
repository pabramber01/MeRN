import { reducers, thunks } from '../../utils';
import {
  createAsyncThunk,
  createSlice,
  isPending,
  isFulfilled,
} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  datetime: '',
  page: 1,
  view: '',
  reachEnd: false,
};

const getAll = createAsyncThunk(
  'commentList/getAll',
  async (view, thunkAPI) => {
    const [name, param] = view.split(/=(.*)/s);
    const { page, datetime } = thunkAPI.getState().commentList;
    const payload = { param, datetime, page };
    switch (name) {
      case 'getAllCommByPublication':
        return thunkAPI.dispatch(getAllCommByPublication(payload));
      default:
        console.log('Wrong view');
    }
  }
);

const getAllCommByPublication = createAsyncThunk(
  'commentList/getAllCommByPublication',
  async ({ param, datetime, page }, thunkAPI) =>
    thunks.get(
      `/publications/${param}/comments?before=${datetime}&page=${page}`,
      thunkAPI
    )
);

const commentListSlice = createSlice({
  name: 'commentList',
  initialState,
  reducers: {
    changeView: (_, { payload }) =>
      reducers.changeViewList(initialState, payload),
    changeCommentList: (state, { payload }) => {
      const { _id, comment, user } = payload;
      const n = new Date().toISOString();
      const i = state.data.findIndex((c) => c._id === _id);

      const isDelete = comment === undefined;
      const isEdit = user === undefined;

      if (isDelete) {
        state.data.splice(i, 1);
      } else if (isEdit) {
        state.data[i] = { ...state.data[i], comment, updatedAt: n };
      } else {
        state.data.unshift({ _id, comment, user, createdAt: n, updatedAt: n });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(getAllCommByPublication), reducers.pendingList)
      .addMatcher(
        isFulfilled(getAllCommByPublication),
        reducers.fullfilledList
      );
  },
});

export { getAll };
export const { changeView, changeCommentList } = commentListSlice.actions;
export default commentListSlice.reducer;
