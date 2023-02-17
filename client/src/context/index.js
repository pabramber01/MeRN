import store from './store';
import { getAll, changeView } from './slicePublication';
import {
  loginUser,
  logoutUser,
  createUser,
  getUserProfile,
  changeProfile,
} from './sliceUser';

export default store;
export {
  loginUser,
  logoutUser,
  createUser,
  getUserProfile,
  changeProfile,
  getAll,
  changeView,
};
