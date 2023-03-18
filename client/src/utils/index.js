import customAxiosAPI, { setupInterceptors } from './axios';
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
} from './localStorage';
import thunks from './thunks';
import { arraysEqual, objectsEqual } from './misc';

export {
  customAxiosAPI,
  setupInterceptors,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
  thunks,
  arraysEqual,
  objectsEqual,
};
