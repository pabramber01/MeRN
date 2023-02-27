import Auth, {
  authSlice,
  logoutUserLocal,
  loginUser,
  logoutUser,
  createUser,
} from './auth';
import Feed, { feedSlice, changeView, getAll, FeedPlaceholder } from './feed';
import User, { userSlice, getUserProfile, UserPlaceholder } from './user';
import Publication, {
  publicationSlice,
  getPublication,
  PublicationPlaceholder,
} from './publication';

export {
  Auth,
  authSlice,
  logoutUserLocal,
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
  Publication,
  publicationSlice,
  getPublication,
  PublicationPlaceholder,
};
