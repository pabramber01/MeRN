import styled from 'styled-components';

const UserFormWrapper = styled.main`
  .warn-delete {
    text-align: justify;
    font-size: 1.1rem;
    font-weight: bold;
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
  .avatar-container {
    display: grid;
    justify-content: center;
  }
  .avatar {
    position: relative;
  }
  input[type='file'] {
    display: none;
  }
  .file-input {
    cursor: pointer;
    margin-top: 6px;
  }
  .delete-icon {
    position: absolute;
    bottom: 0;
    left: 0;
    margin-left: auto;
    margin-right: auto;
    height: 50px;
    width: 50px;
    z-index: 1;
    color: var(--bs-secondary);
    background-color: #f8ede3;
    border-radius: 100%;
  }
  .delete-button {
    position: absolute;
    left: 8px;
    bottom: 8px;
    margin-left: auto;
    margin-right: auto;
    height: 33px;
    width: 33px;
    z-index: 2;
    padding: 0;
    cursor: pointer;
    background: none;
    border: 0;
    border-radius: 100%;
  }
  .delete-disabled {
    cursor: not-allowed;
  }
`;

export default UserFormWrapper;
