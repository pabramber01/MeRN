import { Outlet } from 'react-router-dom';
import { Navbar } from '../layout';

function SharedLayout() {
  return (
    <div className="main">
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default SharedLayout;
