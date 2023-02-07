import { loginUserThunk, logoutUserThunk, createUserThunk } from './userThunk';
import userSlice, { loginUser, logoutUser, createUser } from './userSlice';

export default userSlice;
export {
  loginUser,
  logoutUser,
  createUser,
  loginUserThunk,
  logoutUserThunk,
  createUserThunk,
};
