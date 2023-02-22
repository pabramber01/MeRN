import Auth, { authSlice, loginUser, logoutUser, createUser } from './auth';
import Feed, { feedSlice, changeView, getAll, FeedPlaceholder } from './feed';
import User, { userSlice, getUserProfile, UserPlaceholder } from './user';

export {
  Auth,
  authSlice,
  loginUser,
  logoutUser,
  createUser,
  Feed,
  feedSlice,
  changeView,
  getAll,
  FeedPlaceholder,
  User,
  userSlice,
  getUserProfile,
  UserPlaceholder,
};
