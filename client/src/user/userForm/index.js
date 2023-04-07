import UserForm from './UserForm';
import UserFormWrapper from './UserFormWrapper';
import UserFormGeneral from './UserFormGeneral';
import UserFormSecurity from './UserFormSecurity';
import userFormService from './userFormService';
import UserFormGeneralPlaceholder from './UserFormGeneralPlaceholder';
import userFormSlice, {
  updatePassword,
  deleteUser,
  getUserData,
  updateUser,
  followUser,
  unfollowUser,
  banUser,
  unbanUser,
} from './userFormSlice';

export default UserForm;
export {
  UserFormWrapper,
  UserFormGeneralPlaceholder,
  UserFormGeneral,
  UserFormSecurity,
  userFormService,
  userFormSlice,
  updateUser,
  updatePassword,
  deleteUser,
  getUserData,
  followUser,
  unfollowUser,
  banUser,
  unbanUser,
};
