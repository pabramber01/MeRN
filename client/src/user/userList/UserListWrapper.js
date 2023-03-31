import styled from 'styled-components';

const UserListWrapper = styled.main`
  .search-form {
    display: flex;
    align-items: end;
    margin-bottom: 1.5rem;
  }
  .user-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 75px;
    border: 1px solid rgba(var(--bs-secondary-rgb), 0.5);
    border-radius: 10px;
    background-color: var(--bs-light);
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    transition: all 0.3s ease-in-out;
  }
  .user {
    display: flex;
    align-items: center;
    max-width: 75%;
  }
  a {
    color: var(--bs-body-color);
    text-decoration: none;
    display: flex;
  }
  .user-img,
  .placeholder-avatar {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border: 2px solid rgba(var(--bs-primary-rgb));
    border-radius: 50%;
    box-shadow: 5px 2px 5px rgba(var(--bs-secondary-rgb));
  }
  .user-info {
    display: block;
    overflow-x: scroll;
    padding-bottom: 10px;
    padding-top: 10px;
  }
  .email,
  .username {
    margin: auto 5px auto 5px;
  }
  .ban-placeholder,
  .ban-action,
  .unban-action {
    width: 72.6333px;
  }
  .ban-placeholder {
    color: var(--bs-secondary);
  }
  .admin-role {
    display: block;
    width: 72.6333px;
    text-align: center;
  }
  @media not all and (any-pointer: coarse) {
    .user-card:hover {
      transform: scale(1.05);
      transition: all 0.3s ease-in-out;
    }
  }
`;

export default UserListWrapper;
