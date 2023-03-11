import { Outlet } from 'react-router-dom';
import { Navbar } from '../layout';

function SharedLayout() {
  return (
    <div className="main">
      <Navbar />
      <div className="container px-4 pt-1 pb-2">
        <Outlet />
      </div>
    </div>
  );
}

export default SharedLayout;
