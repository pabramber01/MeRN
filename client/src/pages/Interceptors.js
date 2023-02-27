import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setupInterceptors } from '../utils';

function Interceptors() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setupInterceptors(dispatch, navigate); // eslint-disable-next-line
  }, []);

  return null;
}

export default Interceptors;
