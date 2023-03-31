import { SpinnerButton } from '..';

function FormSubmit({
  className,
  btn,
  onClick,
  disabled,
  text,
  alwaysDisabled,
}) {
  if (!alwaysDisabled) alwaysDisabled = {};

  return (
    <div className={className}>
      <button
        type="submit"
        className={`btn btn-${btn}`}
        disabled={alwaysDisabled.disabled || disabled}
        onClick={onClick ? onClick : undefined}
      >
        {alwaysDisabled.disabled ? (
          alwaysDisabled.text
        ) : disabled ? (
          <SpinnerButton />
        ) : (
          text || 'Submit'
        )}
      </button>
    </div>
  );
}
export default FormSubmit;
