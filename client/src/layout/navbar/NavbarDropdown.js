import { Link } from 'react-router-dom';

function NavbarDropdown({ label, children }) {
  return (
    <>
      <li className="nav-item dropdown">
        <Link
          className="nav-link dropdown-toggle dropdown-toggle-desktop"
          to="#"
        >
          {label}
        </Link>
        <Link
          className="nav-link dropdown-toggle dropdown-toggle-mobile"
          to="#"
          data-bs-toggle="dropdown"
        >
          {label}
        </Link>
        <ul className="dropdown-menu dropdown-menu-center dropdown-menu-fade dropdown-menu-hover">
          {children}
        </ul>
      </li>
      <hr className="separator" />
    </>
  );
}

export default NavbarDropdown;
