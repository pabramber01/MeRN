import customAxiosAPI, { setupInterceptors } from './axios';
import thunks from './thunks';
import { arraysEqual, objectsEqual } from './misc';
import { imgIsCached } from './cache';
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
} from './localStorage';
import reducers from './reducers';

export {
  customAxiosAPI,
  setupInterceptors,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
  thunks,
  arraysEqual,
  objectsEqual,
  imgIsCached,
  reducers,
};
