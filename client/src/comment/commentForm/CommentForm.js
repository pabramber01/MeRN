import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormTextArea, FormSubmit } from '../../layout';
import {
  CommentFormWrapper,
  commentFormService,
  createComment,
  updateComment,
} from '.';
import { changeCommentList } from '..';

const initialValues = (c) => ({
  comment: { value: c.comment || '', hasError: null, errorMsg: '' },
  isLoading: false,
});

function CommentForm({ type, id }) {
  const dispatch = useDispatch();
  const { comment } = useSelector((state) => state.commentForm);
  const { currentUser: user } = useSelector((state) => state.authForm);
  const [values, setValues] = useState(initialValues(comment));

  useEffect(() => {
    if (type === 'new') {
      setValues(initialValues({}));
    } else if (type === 'edit') {
      setValues(initialValues(comment));
    } // eslint-disable-next-line
  }, [comment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { comment } = values;

    const validation = commentFormService.validate(comment.value);

    setValues(validation);
    if (commentFormService.checkErrors(validation)) {
      return;
    }

    const data = { comment: comment.value, publication: id };
    const c = (_id, u) => ({ _id, comment: comment.value, ...(u && { user }) });

    setValues({ ...validation, isLoading: true });
    if (type === 'new') {
      dispatch(createComment(data))
        .unwrap()
        .then((res) => {
          dispatch(changeCommentList(c(res.data._id, true)));
          setValues(initialValues({}));
        })
        .catch(() => setValues({ ...validation, isLoading: false }));
    } else if (type === 'edit') {
      dispatch(updateComment(data))
        .unwrap()
        .then((res) => {
          dispatch(changeCommentList(c(res.data._id, false)));
          setValues({ ...validation, isLoading: false });
          document.getElementById('closeModal').click();
        })
        .catch(() => setValues({ ...validation, isLoading: false }));
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: { ...values[name], value } });
  };

  return (
    <CommentFormWrapper>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <FormTextArea
            name="comment"
            value={values.comment.value}
            placeholder="That looks cool!"
            onChange={handleChange}
            hasError={values.comment.hasError}
            errorMsg={values.comment.errorMsg}
          />
          <FormSubmit
            btn="primary"
            disabled={values.isLoading}
            className="submit-btn"
          />
        </div>
      </form>
    </CommentFormWrapper>
  );
}

export default CommentForm;
