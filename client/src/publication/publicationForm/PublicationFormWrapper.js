import styled from 'styled-components';

const PublicationFormWrapper = styled.main`
  .input-container {
    margin: 3.6rem 0.5rem 0.5rem 0.5rem;
  }
  input[type='file'] {
    display: none;
  }
  .file-input {
    cursor: pointer;
    margin-top: 1rem;
  }
  .disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

export default PublicationFormWrapper;
