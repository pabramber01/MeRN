import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Protected = ({ children }) => {
  const { currentUser } = useSelector((store) => store.authForm);
  if (!currentUser) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default Protected;
