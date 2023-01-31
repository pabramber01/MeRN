import { VscError } from 'react-icons/vsc';
import { Wrapper } from './index';

function FormInputError({ hasError, msg }) {
  return (
    <Wrapper>
      {hasError && (
        <span className="span-error">
          <VscError /> {msg}
        </span>
      )}
    </Wrapper>
  );
}

export default FormInputError;
