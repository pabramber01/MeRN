import customAxiosAPI from './axios';

const thunks = {
  get: async (url, thunkAPI) => {
    try {
      return (await customAxiosAPI.get(url)).data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
  post: async (url, data, thunkAPI) => {
    try {
      return (await customAxiosAPI.post(url, data)).data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
};

export default thunks;
