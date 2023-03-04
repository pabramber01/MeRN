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
      if (err.response.status === 401) {
        dispatch(logoutUserLocal());
        return;
      } else if (err.response.status === 403) {
        navigate('/');
      }
      return Promise.reject(err);
    }
  );
};

export default customAxiosAPI;
export { setupInterceptors };
