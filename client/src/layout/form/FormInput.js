function FormInput({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
}) {
  return (
    <div className="form-group">
      <label className="my-1" htmlFor={name}>
        {label || name}
      </label>
      <input
        className="form-control"
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
    </div>
  );
}

export default FormInput;
