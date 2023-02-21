import store from './store';
import { getAll, changeView } from './slicePublication';
import { loginUser, logoutUser, createUser, getUserProfile } from './sliceUser';

export default store;
export {
  loginUser,
  logoutUser,
  createUser,
  getUserProfile,
  getAll,
  changeView,
};
