import styled from 'styled-components';

const Wrapper = styled.main`
  .navbar-brand {
    width: 40%;
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
    margin: 1rem auto 0 auto;
    width: 96%;
  }
  .separator {
    margin: 0 auto 0 auto;
    width: 96%;
  }
`;

export default Wrapper;
