import customAxiosAPI, { setupInterceptors } from './axios';
import thunks from './thunks';
import { arraysEqual, objectsEqual, numberFormatter } from './misc';
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
  numberFormatter,
  imgIsCached,
  reducers,
};
