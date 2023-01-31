import axios from 'axios';

const customAxiosAPI = axios.create({
  baseURL: REACT_APP_API_URL,
});

export default customAxiosAPI;
