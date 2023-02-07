import { customAxiosAPI } from '../../utils';

const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    return (await customAxiosAPI.post(url, user)).data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
};

const logoutUserThunk = async (url, thunkAPI) => {
  try {
    return (await customAxiosAPI.get(url)).data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
};

const createUserThunk = async (url, user, thunkAPI) => {
  try {
    return (await customAxiosAPI.post(url, user)).data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
};

export { loginUserThunk, logoutUserThunk, createUserThunk };
