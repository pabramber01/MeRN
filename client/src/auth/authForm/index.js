import authFormSlice, {
  logoutUserLocal,
  loginUser,
  logoutUser,
  createUser,
} from './authFormSlice';
import AuthForm from './AuthForm';
import authFormService from './authFormService';
import AuthFormWrapper from './AuthFormWrapper';

export default AuthForm;
export {
  authFormSlice,
  logoutUserLocal,
  loginUser,
  logoutUser,
  createUser,
  authFormService,
  AuthFormWrapper,
};
