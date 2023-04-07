import styled from 'styled-components';

const AvatarWrapper = styled.main`
  .user-avatar-sm,
  .placeholder-avatar-sm {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid rgba(var(--bs-primary-rgb));
  }
  .shadow-sm {
    box-shadow: 5px 2px 5px rgba(var(--bs-secondary-rgb)) !important;
  }
  .user-avatar-lg,
  .placeholder-avatar-lg {
    width: 150px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 50%;
    border: thick solid rgba(var(--bs-primary-rgb));
  }
  .shadow-lg {
    box-shadow: 10px 5px 5px rgba(var(--bs-secondary-rgb)) !important;
  }
  .placeholder {
    color: var(--bs-dark);
  }
`;

export default AvatarWrapper;
