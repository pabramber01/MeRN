import styled from 'styled-components';

const PublicationWrapper = styled.main`
  .publication-info {
    display: block;
    margin-top: 7px;
  }
  .publication-title {
    color: var(--bs-secondary);
  }
  .publication-description {
    text-indent: 50px;
    text-align: justify;
    letter-spacing: 2px;
    word-spacing: 5px;
    overflow-wrap: break-word;
    word-break: break-word;
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
    text-decoration: none !important;
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

export default PublicationWrapper;
