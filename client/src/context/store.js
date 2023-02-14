import { configureStore } from '@reduxjs/toolkit';
import publicationSlice from './publication';
import userSlice from './user';

const store = configureStore({
  reducer: {
    user: userSlice,
    publication: publicationSlice,
  },
});

export default store;
