import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authFormSlice } from './auth';
import { userShowSlice } from './user';
import {
  publicationListSlice,
  publicationShowSlice,
  publicationFormSlice,
} from './publication';

const combinedReducer = combineReducers({
  authForm: authFormSlice,
  userShow: userShowSlice,
  publicationList: publicationListSlice,
  publicationShow: publicationShowSlice,
  publicationForm: publicationFormSlice,
});

const rootReducer = (state, action) => {
  const resetActions = [
    'authForm/logoutUser/fulfilled',
    'authForm/logoutUserLocal',
  ];

  if (resetActions.includes(action.type)) {
    state = undefined;
  }

  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
