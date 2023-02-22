import { VscError } from 'react-icons/vsc';
import { FormWrapper } from './index';

function FormInputError({ hasError, msg }) {
  return (
    <FormWrapper>
      {hasError && (
        <span className="span-error">
          <VscError /> {msg}
        </span>
      )}
    </FormWrapper>
  );
}

export default FormInputError;
