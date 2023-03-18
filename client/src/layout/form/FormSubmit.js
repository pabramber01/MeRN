import { SpinnerButton } from '..';

function FormSubmit({ className, btn, disabled, onClick, text }) {
  return (
    <div className={className}>
      <button
        type="submit"
        className={`btn btn-${btn}`}
        disabled={disabled}
        onClick={onClick ? onClick : undefined}
      >
        {disabled ? <SpinnerButton /> : text || 'Submit'}
      </button>
    </div>
  );
}
export default FormSubmit;
