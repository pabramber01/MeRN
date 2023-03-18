import styled from 'styled-components';

const NavbarWrapper = styled.main`
  .navbar-brand {
    width: 50%;
    margin-right: 0;
  }
  .active {
    color: #ffffff !important;
  }
  .offcanvas {
    background-color: #f8f9fa;
  }
  .dropdown-toggle:after {
    margin: auto 0 auto 0.255em;
    transform: rotate(-90deg);
    transition: 0.3s;
  }
  .dropdown-toggle[aria-expanded='true']:after {
    transform: rotate(0);
  }
  .initial-separator {
    margin-top: 1rem;
    margin-bottom: 0;
  }
  .separator {
    margin-top: 0;
    margin-bottom: 0;
  }
  .dropdown-menu-fade {
    max-height: 0px;
    opacity: 0;
    visibility: hidden;
    transition: max-height 0.4s, opacity 0.3s 0.1s, visibility 0.4s;
    overflow: hidden;
    display: block;
    padding: 0;
  }
  .dropdown-menu-fade.show {
    max-height: 133px;
    opacity: 1;
    visibility: visible;
    transition: max-height 0.4s, opacity 0.3s;
  }
  .dropdown-divider {
    margin: 0;
  }
  @media (max-width: 1199px) {
    .nav-pills {
      --bs-nav-pills-border-radius: 0;
    }
    .dropdown-menu {
      margin: 0;
      border-radius: 0;
    }
  }
  @media (min-width: 1200px) {
    .search-input {
      transform: translateX(-50%);
    }
    .dropdown-menu {
      margin-top: 0.5rem;
      border-radius: 5px;
      min-width: 8rem;
    }
    .dropdown-menu-center {
      left: 50%;
      transform: translateX(-50%);
    }
    .dropdown:hover > .dropdown-toggle-hover:after {
      transform: rotate(0);
    }
    .dropdown:hover > .dropdown-menu-hover {
      max-height: 133px;
      opacity: 1;
      visibility: visible;
      transition: max-height 0.4s, opacity 0.3s;
    }
  }
`;

export default NavbarWrapper;
