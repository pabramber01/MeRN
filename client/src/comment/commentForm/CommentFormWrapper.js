import styled from 'styled-components';

const CommentFormWrapper = styled.main`
  .input-container {
    display: flex;
    margin-bottom: 1rem;
  }
  .form-group {
    width: 100%;
  }
  textarea {
    height: 17px;
  }
  .submit-btn {
    display: grid;
    margin-left: 0.25rem;
    margin-top: 24px;
    min-width: 117.217px;
    height: fit-content;
  }
`;

export default CommentFormWrapper;
