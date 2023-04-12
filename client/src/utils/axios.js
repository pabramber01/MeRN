import axios from 'axios';
import { logoutUserLocal } from '../auth';

const customAxiosAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

const setupInterceptors = (dispatch, navigate) => {
  customAxiosAPI.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      const isUnauthorized = err.response.status === 401;
      const isForbidden = err.response.status === 403;
      const isNotFound = err.response.status === 404;
      const isNotBanned = !err.response.data.msg.includes('ban');

      if (isUnauthorized) {
        dispatch(logoutUserLocal());
        return;
      } else if (isForbidden && isNotBanned) {
        navigate('/');
      } else if (isNotFound) {
        dispatch({ type: 'RESET' });
        navigate('/');
      }
      return Promise.reject(err);
    }
  );
};

export default customAxiosAPI;
export { setupInterceptors };
