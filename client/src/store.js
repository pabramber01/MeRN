import { configureStore } from '@reduxjs/toolkit';
import { authFormSlice } from './auth';
import { userShowSlice } from './user';
import { publicationListSlice, publicationShowSlice } from './publication';

const store = configureStore({
  reducer: {
    authForm: authFormSlice,
    userShow: userShowSlice,
    publicationList: publicationListSlice,
    publicationShow: publicationShowSlice,
  },
});

export default store;
