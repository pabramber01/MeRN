import { CommentListWrapper } from '.';
import { RiEditBoxLine, RiDeleteBin2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Avatar, ReadMore, Spinner } from '../../layout';
import { useDispatch, useSelector } from 'react-redux';
import { changeCommentList, deleteComment, loadComment } from '..';
import { useState } from 'react';

const initialValues = {
  isLoading: false,
};

function CommentListSingle({
  data: { _id, comment, createdAt, updatedAt, user },
}) {
  const { currentUser } = useSelector((store) => store.authForm);
  const [values, setValues] = useState(initialValues);
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(loadComment({ id: _id, comment }));
  };

  const handleDelete = () => {
    if (window.confirm('Do you really want to delete this comment?')) {
      setValues({ isLoading: true });
      dispatch(deleteComment(_id))
        .unwrap()
        .then(() => dispatch(changeCommentList({ _id })))
        .catch(() => setValues({ isLoading: false }));
    }
  };

  return (
    <CommentListWrapper>
      <div className="comment-card">
        <div className="avatar">
          <Link to={`/users/${user.username}`}>
            <Avatar url={user.avatar} size="sm" shadow={true} />
          </Link>
        </div>
        <div className="info">
          <div className="header">
            {user.username} · {new Date(updatedAt).toLocaleDateString('en-US')}
            {createdAt !== updatedAt && ' (edited)'}
          </div>
          <div className="body">
            <ReadMore>{comment}</ReadMore>
          </div>
          {currentUser.username === user.username && (
            <div className="actions">
              {values.isLoading ? (
                <Spinner color="secondary" small={true} />
              ) : (
                <>
                  <RiEditBoxLine
                    size={25}
                    onClick={handleEdit}
                    type="button"
                    className="mx-1"
                    data-bs-toggle="modal"
                    data-bs-target="#editComment"
                  />
                  <RiDeleteBin2Line
                    size={25}
                    onClick={handleDelete}
                    type="button"
                    className="mx-1"
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </CommentListWrapper>
  );
}
export default CommentListSingle;
