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
  ScrollToTop,
  Interceptors,
  PublicationCreation,
} from './pages';
import PublicationDetails from './pages/PublicationDetails';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Interceptors />
        <ScrollToTop />
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
            <Route path="publications/new" element={<PublicationCreation />} />
            <Route path="publications/:id" element={<PublicationDetails />} />
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
