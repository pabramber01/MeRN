import authSlice, {
  logoutUserLocal,
  loginUser,
  logoutUser,
  createUser,
} from './authSlice';
import Auth from './Auth';
import authService from './authService';
import AuthWrapper from './AuthWrapper';

export default Auth;
export {
  authSlice,
  logoutUserLocal,
  loginUser,
  logoutUser,
  createUser,
  authService,
  AuthWrapper,
};
