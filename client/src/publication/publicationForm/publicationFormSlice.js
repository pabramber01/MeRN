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
  publication: {},
  isLoading: false,
};

const createPublication = createAsyncThunk(
  'publicationForm/createPublication',
  async (publication, thunkAPI) =>
    thunks.post('/publications', publication, thunkAPI)
);

const updatePublication = createAsyncThunk(
  'publicationForm/updatePublication',
  async (publication, thunkAPI) =>
    thunks.patch(
      `/publications/${thunkAPI.getState().publicationForm.publication.id}`,
      publication,
      thunkAPI
    )
);

const deletePublication = createAsyncThunk(
  'publicationForm/deletePublication',
  async (_, thunkAPI) =>
    thunks.delete(
      `/publications/${thunkAPI.getState().publicationForm.publication.id}`,
      thunkAPI
    )
);

const likePublication = createAsyncThunk(
  'publicationForm/likePublication',
  async (_, thunkAPI) => {
    const { id } = thunkAPI.getState().publicationForm.publication;
    return thunks.patch(`/publications/${id}/like`, null, thunkAPI);
  }
);

const dislikePublication = createAsyncThunk(
  'publicationForm/dislikePublication',
  async (_, thunkAPI) => {
    const { id } = thunkAPI.getState().publicationForm.publication;
    return thunks.patch(`/publications/${id}/dislike`, null, thunkAPI);
  }
);

const publicationFormSlice = createSlice({
  name: 'publicationForm',
  initialState,
  reducers: {
    loadPublication: (state, { payload }) => {
      const { _id, title, description, images } = payload;
      state.publication = { id: _id, title, description, images };
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isPending(createPublication, updatePublication, deletePublication),
        reducers.pending
      )
      .addMatcher(
        isFulfilled(createPublication, updatePublication),
        (state, { payload }) => {
          const { data } = payload;
          state.publication = { id: data._id };
          state.isLoading = false;
          toast.success(`Your publication was uploaded!`);
        }
      )
      .addMatcher(isFulfilled(deletePublication), (state) => {
        state = initialState;
        toast.success('Publication was successfully deleted!');
      })
      .addMatcher(
        isRejectedWithValue(
          createPublication,
          updatePublication,
          deletePublication,
          likePublication,
          dislikePublication
        ),
        reducers.reject
      );
  },
});

export {
  createPublication,
  updatePublication,
  deletePublication,
  likePublication,
  dislikePublication,
};
export const { loadPublication } = publicationFormSlice.actions;
export default publicationFormSlice.reducer;
