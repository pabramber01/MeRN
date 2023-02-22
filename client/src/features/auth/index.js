import authSlice, { loginUser, logoutUser, createUser } from './authSlice';
import Auth from './Auth';
import authService from './authService';
import AuthWrapper from './AuthWrapper';

export default Auth;
export {
  authSlice,
  loginUser,
  logoutUser,
  createUser,
  authService,
  AuthWrapper,
};
