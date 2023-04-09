import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Spinner } from '../spinner';

const revertColor = (txt) => {
  return txt.includes('primary')
    ? txt.replace('primary', 'secondary')
    : txt.replace('secondary', 'primary');
};

const initialValues = {
  isLoading: false,
};

function DUButton({ page, allPages }) {
  const [values, setValues] = useState(initialValues);
  const dispatch = useDispatch();
  let action, btnClass, color, text;

  const index = Object.keys(allPages).findIndex((p) => page.startsWith(p));

  let {
    condition,
    isDoAction,
    doAction,
    doText,
    undoAction,
    undoText,
    thenActions,
    changeColor,
  } = Object.values(allPages)[index];

  condition = condition || (() => true);
  action = isDoAction ? doAction : undoAction;
  text = isDoAction ? doText : undoText;
  btnClass = isDoAction ? 'secondary do-action' : 'primary undo-action';
  color = isDoAction ? 'primary' : 'secondary';

  if (changeColor) {
    btnClass = revertColor(btnClass);
    color = revertColor(color);
  }

  const handleAction = (f, gs) => {
    setValues({ isLoading: true });
    if (condition())
      dispatch(f())
        .unwrap()
        .then(() => {
          setValues({ isLoading: false });
          gs.forEach((g) => dispatch(g()));
        });
    else setValues({ isLoading: false });
  };

  return (
    <button
      className={`btn btn-${btnClass}`}
      onClick={() => handleAction(action, thenActions)}
      disabled={values.isLoading}
    >
      {values.isLoading ? (
        <Spinner centered={true} color={color} small={true} />
      ) : (
        text
      )}
    </button>
  );
}
export default DUButton;
