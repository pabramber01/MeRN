import styled from 'styled-components';

const CommentListWrapper = styled.main`
  .comment-card {
    display: flex;
    min-height: 75px;
    border: 1px solid rgba(var(--bs-secondary-rgb), 0.5);
    border-radius: 10px;
    background-color: var(--bs-light);
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 1rem 1rem 1rem 0.5rem;
    transition: all 0.3s ease-in-out;
  }
  .info {
    width: 100%;
    margin-left: 10px;
  }
  .header {
    color: grey;
  }
  .body {
    text-align: justify;
    overflow-wrap: break-word;
    word-break: break-word;
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: end;
    color: var(--bs-secondary);
  }
  @media not all and (any-pointer: coarse) {
    .comment-card:hover {
      transform: scale(1.05);
      transition: all 0.3s ease-in-out;
    }
  }
`;

export default CommentListWrapper;
