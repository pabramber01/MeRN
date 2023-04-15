import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejectedWithValue,
  isFulfilled,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { reducers, thunks } from '../../utils';

const initialState = {
  comment: {},
};

const createComment = createAsyncThunk(
  'commentForm/createComment',
  async (comment, thunkAPI) => thunks.post('/comments', comment, thunkAPI)
);

const updateComment = createAsyncThunk(
  'commentForm/updateComment',
  async (comment, thunkAPI) =>
    thunks.patch(
      `/comments/${thunkAPI.getState().commentForm.comment.id}`,
      comment,
      thunkAPI
    )
);

const deleteComment = createAsyncThunk(
  'commentForm/deleteComment',
  async (id, thunkAPI) => thunks.delete(`/comments/${id}`, thunkAPI)
);

const commentFormSlice = createSlice({
  name: 'commentForm',
  initialState,
  reducers: {
    loadComment: (state, { payload }) => {
      const { id, comment } = payload;
      state.comment = { id, comment };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isPending(createComment, updateComment, deleteComment),
        reducers.pending
      )
      .addMatcher(
        isFulfilled(createComment, updateComment),
        (state, { payload }) => {
          const { data } = payload;
          state.comment.id = data._id;
          toast.success(`Your comment was uploaded!`);
        }
      )
      .addMatcher(isFulfilled(deleteComment), () => {
        toast.success('Comment was successfully deleted!');
        return initialState;
      })
      .addMatcher(
        isRejectedWithValue(createComment, updateComment, deleteComment),
        (_, { payload }) => {
          const id = 'pub' + payload.msg.split(' ').pop().replaceAll("'", '');
          reducers.rejectOneMsgNoLoading({ payload }, id);
        }
      );
  },
});

export { createComment, updateComment, deleteComment };
export const { loadComment } = commentFormSlice.actions;
export default commentFormSlice.reducer;
