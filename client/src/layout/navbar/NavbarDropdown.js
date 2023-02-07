import { Link } from 'react-router-dom';

function NavbarDropdown({ label, children }) {
  return (
    <>
      <li className="nav-item dropdown">
        <Link
          className="nav-link dropdown-toggle px-3 d-flex justify-content-between"
          to="#"
          data-bs-toggle="dropdown"
        >
          {label}
        </Link>
        <ul className="dropdown-menu">{children}</ul>
      </li>
      <hr className="separator" />
    </>
  );
}

export default NavbarDropdown;
