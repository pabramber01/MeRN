import styled from 'styled-components';

const UserShowWrapper = styled.main`
  .profile,
  .placeholder-profile {
    display: flex;
    margin: 1rem auto 0.5rem auto;
  }
  .user-img,
  .placeholder-img {
    width: 150px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border: thick solid rgba(var(--bs-primary-rgb));
    border-radius: 50%;
    box-shadow: 10px 5px 5px rgba(var(--bs-secondary-rgb));
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
    margin: 0.5rem auto 0.4rem auto;
  }
  .profile-info {
    display: flex;
    text-align: center;
    margin: auto 1rem auto 1rem;
  }
  h6 {
    width: 70px;
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
