import { Link } from 'react-router-dom';
import { Wrapper } from '.';

function NavbarDropdown({ label, children }) {
  return (
    <>
      <li className="nav-item dropdown">
        <Link
          className="nav-link dropdown-toggle dropdown-toggle-hover px-3 d-flex justify-content-between"
          to="#"
          data-bs-toggle="dropdown"
        >
          {label}
        </Link>
        <ul className="dropdown-menu dropdown-menu-center dropdown-menu-fade dropdown-menu-hover m-0 rounded-0">
          {children}
        </ul>
      </li>
      <hr className="separator" />
    </>
  );
}

export default NavbarDropdown;
