import styled from 'styled-components';

const TabsWrapper = styled.main`
  .nav.nav-tabs {
    margin-top: calc(1rem + 1.5vw);
    transform: translateY(-50%);
  }
  .nav-item {
    padding-left: 1rem;
  }
  .nav-link {
    color: var(--bs-secondary);
  }
  @media (min-width: 1200px) {
    .nav.nav-tabs {
      margin-top: calc(2.25rem);
    }
  }
`;

export default TabsWrapper;
