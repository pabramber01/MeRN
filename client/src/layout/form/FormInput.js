import FormWrapper from './FormWrapper';

function FormInput({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  hasError,
  errorMsg,
}) {
  return (
    <div className="form-group">
      <label className="my-1" htmlFor={name}>
        {label || name}
      </label>
      <input
        className={`form-control ${
          hasError === null ? undefined : hasError ? 'is-invalid' : 'is-valid'
        }`}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur || undefined}
        placeholder={placeholder}
      />
      <div className="invalid-feedback">{errorMsg}</div>
    </div>
  );
}

export default FormInput;
