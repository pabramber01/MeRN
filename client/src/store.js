import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authFormSlice } from './auth';
import { userShowSlice, userFormSlice } from './user';
import {
  publicationListSlice,
  publicationShowSlice,
  publicationFormSlice,
} from './publication';

const combinedReducer = combineReducers({
  authForm: authFormSlice,
  userShow: userShowSlice,
  userForm: userFormSlice,
  publicationList: publicationListSlice,
  publicationShow: publicationShowSlice,
  publicationForm: publicationFormSlice,
});

const rootReducer = (state, action) => {
  const resetActions = [
    'authForm/logoutUser/fulfilled',
    'authForm/logoutUserLocal',
    'userForm/updateUser/fulfilled',
  ];

  if (resetActions.includes(action.type)) {
    state = { authForm: state.authForm };
  }

  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
