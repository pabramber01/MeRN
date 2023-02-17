import { configureStore } from '@reduxjs/toolkit';
import publicationSlice from './slicePublication';
import userSlice from './sliceUser';

const store = configureStore({
  reducer: {
    user: userSlice,
    publication: publicationSlice,
  },
});

export default store;
