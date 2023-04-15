import 'jest-canvas-mock';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

const Test = ({ component }) => (
  <Provider store={store}>
    <BrowserRouter>{component}</BrowserRouter>
  </Provider>
);

export default Test;
