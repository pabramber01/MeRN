import { Spinner } from '.';

function SpinnerButton({ color }) {
  return (
    <div className="d-flex justify-content-center">
      <Spinner small={true} color={color} />
      <span className="mx-1">Loading...</span>
    </div>
  );
}

export default SpinnerButton;
