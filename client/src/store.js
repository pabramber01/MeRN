import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authFormSlice } from './auth';
import { userShowSlice, userFormSlice, userListSlice } from './user';
import {
  publicationListSlice,
  publicationShowSlice,
  publicationFormSlice,
} from './publication';
import { commentFormSlice, commentListSlice } from './comment';

const combinedReducer = combineReducers({
  authForm: authFormSlice,
  userList: userListSlice,
  userShow: userShowSlice,
  userForm: userFormSlice,
  publicationList: publicationListSlice,
  publicationShow: publicationShowSlice,
  publicationForm: publicationFormSlice,
  commentList: commentListSlice,
  commentForm: commentFormSlice,
});

const rootReducer = (state, action) => {
  const resetActions = [
    'authForm/logoutUser/fulfilled',
    'authForm/logoutUserLocal',
  ];

  const updateUserActions = ['userForm/updateUser/fulfilled'];

  const banActions = [
    'userForm/banUser/fulfilled',
    'userForm/unbanUser/fulfilled',
  ];

  switch (true) {
    case resetActions.includes(action.type):
      state = undefined;
      break;
    case updateUserActions.includes(action.type):
      state = { authForm: state.authForm, userShow: state.userForm };
      break;
    case banActions.includes(action.type):
      state = { authForm: state.authForm, userList: state.userList };
      break;
    default:
      break;
  }

  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
