import customAxiosAPI, { setupInterceptors } from './axios';
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
} from './localStorage';
import thunks from './thunks';

export {
  customAxiosAPI,
  setupInterceptors,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
  thunks,
};
