function FormInput({
  label,
  labelClass,
  type,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  accept,
  disabled,
  hasError,
  errorMsg,
}) {
  let errorClass;
  if (hasError == null) {
    errorClass = undefined;
  } else {
    if (hasError) {
      errorClass = 'is-invalid';
    } else {
      errorClass = 'is-valid';
    }
  }

  let lblClass = labelClass ? labelClass : 'my-1';
  if (type === 'file') lblClass += ` ${errorClass}`;

  return (
    <div className="form-group">
      <label className={lblClass} htmlFor={name}>
        {label}
      </label>
      <input
        className={`form-control ${errorClass}`}
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur || undefined}
        accept={accept || undefined}
        disabled={disabled || false}
      />
      <div className="invalid-feedback">{errorMsg}</div>
    </div>
  );
}

export default FormInput;
