import { configureStore } from '@reduxjs/toolkit';
import { authSlice, userSlice, feedSlice } from './features';

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    feed: feedSlice,
  },
});

export default store;
