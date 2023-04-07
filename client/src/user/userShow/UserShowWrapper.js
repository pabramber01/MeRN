import styled from 'styled-components';

const UserShowWrapper = styled.main`
  .profile,
  .placeholder-profile {
    display: flex;
    margin: 1rem auto 0.5rem auto;
  }
  .profile-data {
    display: grid;
  }
  .username {
    font-size: 1.25rem;
    max-width: 150px;
    margin: auto auto auto auto;
  }
  .username-placeholder {
    width: 50%;
    margin: 7px auto 7px auto;
  }
  .profile-info {
    display: flex;
    text-align: center;
    margin: auto 0.2rem auto 0.2rem;
  }
  h6 {
    width: 60px;
  }
  .actions {
    position: absolute;
    right: 0;
  }
  .do-placeholder,
  .do-action,
  .undo-action {
    min-width: 91.9667px;
  }
  .do-placeholder {
    color: var(--bs-secondary);
  }
  @media (max-width: 1199px) {
    .user-img,
    .placeholder-img {
      width: 100px;
    }
  }
`;

export default UserShowWrapper;
