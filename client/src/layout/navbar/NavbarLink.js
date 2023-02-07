import { NavLink } from 'react-router-dom';

function NavbarLink({ path, label, dropdown }) {
  const liClass = dropdown ? undefined : 'nav-item';
  const linkClass = dropdown ? 'dropdown-item' : 'nav-link px-3';

  const checkActive = (isActive) => {
    return isActive ? linkClass + ' active' : linkClass;
  };

  return (
    <>
      <li className={liClass}>
        <NavLink to={path} className={({ isActive }) => checkActive(isActive)}>
          {label}
        </NavLink>
      </li>
      {!dropdown && <hr className="separator" />}
    </>
  );
}

export default NavbarLink;
