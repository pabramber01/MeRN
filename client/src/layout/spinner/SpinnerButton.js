import { Spinner } from '.';

function SpinnerButton({ color }) {
  return (
    <>
      <Spinner small={true} color={color} />
      <span className="mx-1">Loading...</span>
    </>
  );
}

export default SpinnerButton;
