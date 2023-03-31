import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { banUser, unbanUser } from '..';
import { Spinner, SuspenseImg } from '../../layout';
import {
  UserListWrapper,
  UserListSinglePlaceholderAvatar,
  changeEnabled,
} from '.';

const initialValues = {
  isLoading: false,
};

function UserListSingle({ data: { username, avatar, email, role, enabled } }) {
  const [values, setValues] = useState(initialValues);
  const dispatch = useDispatch();

  const handleAction = (f) => {
    setValues({ isLoading: true });
    dispatch(f(username))
      .unwrap()
      .then(() => {
        setValues({ isLoading: false });
        dispatch(changeEnabled({ username }));
      })
      .catch(() => setValues({ isLoading: false }));
  };

  return (
    <UserListWrapper>
      <div className="user-card">
        <div className="user">
          <Link to={`/users/${username}`}>
            <SuspenseImg
              fallback={<UserListSinglePlaceholderAvatar />}
              attr={{ src: avatar, className: 'user-img', alt: 'avatar' }}
            />
          </Link>
          <div className="user-info">
            <p className="username">{username}</p>
            <p className="email">{email}</p>
          </div>
        </div>
        <div className="user-actions">
          {role === 'admin' ? (
            <span className="admin-role">Admin</span>
          ) : enabled ? (
            <button
              id={username}
              className="btn btn-secondary ban-action"
              onClick={() => handleAction(banUser)}
              disabled={values.isLoading}
            >
              {values.isLoading ? (
                <Spinner centered={true} color="primary" small={true} />
              ) : (
                'Ban'
              )}
            </button>
          ) : (
            <button
              id={username}
              className="btn btn-primary unban-action"
              onClick={() => handleAction(unbanUser)}
              disabled={values.isLoading}
            >
              {values.isLoading ? (
                <Spinner centered={true} color="secondary" small={true} />
              ) : (
                'Unban'
              )}
            </button>
          )}
        </div>
      </div>
    </UserListWrapper>
  );
}

export default UserListSingle;
