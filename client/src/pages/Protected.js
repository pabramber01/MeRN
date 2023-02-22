import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useSelector((store) => store.auth);
  if (!currentUser) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default ProtectedRoute;
