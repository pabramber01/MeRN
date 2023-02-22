import styled from 'styled-components';

const UserWrapper = styled.main`
  .profile,
  .placeholder-profile {
    display: flex;
    margin: 1rem auto 1rem auto;
  }
  .user-img,
  .placeholder-img {
    width: 150px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border: thick solid rgba(var(--bs-primary-rgb));
    border-radius: 50%;
    box-shadow: 10px 5px 5px rgba(var(--bs-danger-rgb));
  }
  .profile-info {
    display: block;
    margin: auto 1rem auto 1rem;
    word-wrap: break-word;
    word-break: break-word;
  }
  @media (max-width: 1199px) {
    .user-img,
    .placeholder-img {
      width: 100px;
    }
  }
`;

export default UserWrapper;
