import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';

import store from './store';
import {
  Protected,
  Landing,
  Error,
  SharedLayout,
  Home,
  Profile,
} from './pages';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <SharedLayout />
              </Protected>
            }
          >
            <Route index element={<Home />} />
            <Route path="users/:username" element={<Profile />} />
          </Route>
          <Route path="/landing" element={<Landing />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer position="bottom-right" />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
