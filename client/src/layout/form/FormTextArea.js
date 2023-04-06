function FormTextArea({
  label,
  labelClass,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  disabled,
  hasError,
  errorMsg,
}) {
  let errorClass;
  if (hasError == null) {
    errorClass = '';
  } else {
    if (hasError) {
      errorClass = 'is-invalid';
    } else {
      errorClass = 'is-valid';
    }
  }

  let lblClass = labelClass ? labelClass : 'my-1';

  return (
    <div className="form-group">
      <label className={lblClass} htmlFor={name}>
        {label}
      </label>
      <textarea
        className={`form-control ${errorClass}`}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur || undefined}
        disabled={disabled || false}
      />
      <div className="invalid-feedback">{errorMsg}</div>
    </div>
  );
}

export default FormTextArea;
