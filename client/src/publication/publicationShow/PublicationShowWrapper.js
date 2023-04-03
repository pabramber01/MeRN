import styled from 'styled-components';

const PublicationShowWrapper = styled.main`
  .publication-info {
    display: block;
    margin-top: 7px;
  }
  .publication-title {
    margin-bottom: 0;
    color: var(--bs-secondary);
  }
  .publication-actions {
    display: flex;
    align-self: center;
    align-items: center;
    color: var(--bs-secondary);
  }
  .likes {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    height: 25px;
    font-weight: bold;
  }
  .publication-description {
    text-indent: 50px;
    text-align: justify;
    letter-spacing: 2px;
    word-spacing: 5px;
    overflow-wrap: break-word;
    word-break: break-word;
  }
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  .footer {
    display: block;
    margin-bottom: 1.5rem;
  }
  .publication-date {
    letter-spacing: 2px;
  }
  .publication-user {
    display: flex;
    justify-content: end;
  }
  a {
    color: var(--bs-body-color);
    text-decoration: none;
    display: flex;
  }
  .placeholder-user-name,
  .user-name {
    margin: auto 5px auto 5px;
  }
  .placeholder-avatar,
  .user-img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border: 2px solid rgba(var(--bs-primary-rgb));
    border-radius: 50%;
    box-shadow: 5px 2px 5px rgba(var(--bs-secondary-rgb));
  }
`;

export default PublicationShowWrapper;
