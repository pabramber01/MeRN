import styled from 'styled-components';

const NavbarWrapper = styled.main`
  .navbar-brand {
    width: 50%;
    margin-right: 0;
  }
  .active {
    color: #ffffff !important;
  }
  .initial-separator {
    margin-top: 1rem;
    margin-bottom: 0;
  }
  .separator {
    margin-top: 0;
    margin-bottom: 0;
  }
  .dropdown-divider {
    margin: 0;
  }
  .dropdown-menu-fade {
    max-height: 0px;
    opacity: 0;
    visibility: hidden;
    transition: max-height 0.2s, opacity 0.1s 0.1s, visibility 0.2s;
    overflow: hidden;
    display: block;
    padding: 0;
  }
  .dropdown-toggle:after {
    margin: auto 0 auto 0.255em;
    transform: rotate(-90deg);
    transition: 0.3s;
  }
  .dropdown-toggle[aria-expanded='true']:after {
    transform: rotate(0);
  }
  .dropdown-menu-fade.show {
    max-height: 166px;
    opacity: 1;
    visibility: visible;
    transition: max-height 0.4s, opacity 0.3s;
  }
  .dropdown-menu {
    margin: 0;
    border-radius: 0;
  }
  .dropdown-item {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .dropdown-toggle-mobile {
    display: flex;
    justify-content: space-between;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .dropdown-toggle-desktop {
    display: none;
    justify-content: space-between;
  }
  .offcanvas {
    background-color: #f8f9fa;
  }
  .nav-pills {
    --bs-nav-pills-border-radius: 0;
  }
  @media (min-width: 1200px) {
    .search-input {
      transform: translateX(-50%);
    }
    .dropdown-menu-center {
      left: 50%;
      transform: translateX(-50%);
    }
    .dropdown-menu {
      margin-top: 0.5rem;
      border-radius: 5px;
      min-width: 8rem;
    }
    .dropdown-item {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    .nav-pills {
      --bs-nav-pills-border-radius: 0.375rem;
    }
    @media not all and (any-pointer: coarse) {
      .dropdown:hover > .dropdown-toggle-desktop:after {
        transform: rotate(0);
      }
      .dropdown:hover > .dropdown-menu-hover {
        max-height: 166px;
        opacity: 1;
        visibility: visible;
        transition: max-height 0.4s, opacity 0.3s;
      }
      .dropdown-toggle-mobile {
        display: none;
      }
      .dropdown-toggle-desktop {
        display: flex;
      }
    }
  }
`;

export default NavbarWrapper;
