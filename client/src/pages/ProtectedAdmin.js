import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ProtectedAdmin = () => {
  const { currentUser } = useSelector((store) => store.authForm);
  if (currentUser.role !== 'admin') {
    toast.error('Invalid authorization');
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedAdmin;
