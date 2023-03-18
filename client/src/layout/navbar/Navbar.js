import { useSelector } from 'react-redux';
import { NavbarDropdown, NavbarLink, NavbarLogout, NavbarWrapper } from '.';
import { Logo, Separator } from '..';

function Navbar() {
  const {
    currentUser: { username },
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
              <button className="btn-close" data-bs-dismiss="offcanvas" />
            </div>
            {/* Offcanvas body && Navbar body */}
            <div className="offcanvas-body justify-content-between">
              <form className="search-input">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                />
              </form>
              <br />
              <ul className="navbar-nav nav-pills">
                <hr className="initial-separator" />
                <NavbarLink path="/" label="Home" />
                <NavbarDropdown label={`${username}`}>
                  <NavbarLink
                    path={`/publications/new`}
                    label="New Post"
                    dropdown={true}
                  />
                  <hr className="dropdown-divider" />
                  <NavbarLink
                    path={`/users/${username}`}
                    label="My Profile"
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
