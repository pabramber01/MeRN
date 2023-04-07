import { useSelector } from 'react-redux';
import {
  NavbarAvt,
  NavbarDropdown,
  NavbarLink,
  NavbarLogout,
  NavbarSearch,
  NavbarWrapper,
} from '.';
import { Logo, Separator } from '..';

function Navbar() {
  const {
    currentUser: { username, role, avatar },
  } = useSelector((state) => state.authForm);

  return (
    <NavbarWrapper className="sticky-top">
      <nav className="navbar navbar-expand-xl bg-light">
        <div className="container-md">
          {/* Navbar brand */}
          <span className="navbar-brand">
            <Logo />
          </span>

          {/* Toggler button when collapse */}
          <button
            className="navbar-toggler"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Offcanvas */}
          <div className="offcanvas offcanvas-start" id="offcanvasNavbar">
            {/* Offcanvas header */}
            <div className="offcanvas-header">
              <span className="offcanvas-title">
                <Logo />
              </span>
              <button
                id="close-offcanvas"
                className="btn-close"
                data-bs-dismiss="offcanvas"
              />
            </div>
            {/* Offcanvas body && Navbar body */}
            <div className="offcanvas-body justify-content-between align-items-center">
              <NavbarSearch />
              <br />
              <ul className="navbar-nav nav-pills">
                <hr className="initial-separator" />
                <NavbarLink path="/" label="Home" />
                <NavbarLink path="/publications/new" label="New" />
                {role === 'admin' && (
                  <NavbarDropdown label="Admin">
                    <NavbarLink
                      path={`/admin/users`}
                      label="Users dashboard"
                      dropdown={true}
                    />
                  </NavbarDropdown>
                )}
                <NavbarDropdown label={<NavbarAvt a={avatar} u={username} />}>
                  <NavbarLink
                    path={`/users/${username}`}
                    label="My Profile"
                    dropdown={true}
                  />
                  <NavbarLink
                    path={`/users/myfollows`}
                    label="My follows"
                    dropdown={true}
                  />
                  <NavbarLink
                    path={`/users/mysettings`}
                    label="My settings"
                    dropdown={true}
                  />
                  <hr className="dropdown-divider" />
                  <NavbarLogout />
                </NavbarDropdown>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Separator color={'primary'} />
    </NavbarWrapper>
  );
}

export default Navbar;
