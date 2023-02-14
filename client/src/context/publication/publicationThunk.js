import { customAxiosAPI } from '../../utils';
import { getAllPublications } from '.';

const getAllThunk = async (view, thunkAPI) => {
  switch (view) {
    case 'home':
      thunkAPI.dispatch(getAllPublications());
      break;
    default:
      console.log('Wrong view');
  }
};

const getAllPublicationsThunk = async (url, thunkAPI) => {
  try {
    return (await customAxiosAPI.get(url)).data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err.response.data);
  }
};

export { getAllThunk, getAllPublicationsThunk };
