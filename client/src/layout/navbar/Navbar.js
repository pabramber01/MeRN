import { NavbarDropdown, NavbarLink, NavbarLogout, Wrapper } from '.';
import { Logo } from '..';

function Navbar() {
  return (
    <Wrapper>
      <nav className="navbar navbar-expand-lg bg-light">
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
              <form>
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
                <NavbarLink path="/link" label="Link" />
                <NavbarDropdown label="Account">
                  <NavbarLink path="/yolo1" label="Home" dropdown={true} />
                  <NavbarLink path="/yolo2" label="Action 2" dropdown={true} />
                  <hr className="dropdown-divider" />
                  <NavbarLogout />
                </NavbarDropdown>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </Wrapper>
  );
}

export default Navbar;
