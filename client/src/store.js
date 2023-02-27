import { configureStore } from '@reduxjs/toolkit';
import { authSlice, userSlice, feedSlice, publicationSlice } from './features';

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    feed: feedSlice,
    publication: publicationSlice,
  },
});

export default store;
