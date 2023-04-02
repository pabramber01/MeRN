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
  PublicationEdit,
  Publication,
  ProtectedAdmin,
  UsersDashboard,
} from './pages';
import Settings from './pages/Settings';

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
            <Route path="users/mysettings" element={<Settings />} />
            <Route path="users/myfollows" element={<UsersDashboard />} />
            <Route path="publications/:id" element={<Publication />} />
            <Route path="publications/new" element={<PublicationEdit />} />
            <Route path="publications/edit" element={<PublicationEdit />} />
            <Route path="admin/" element={<ProtectedAdmin />}>
              <Route path="users" element={<UsersDashboard />} />
            </Route>
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
