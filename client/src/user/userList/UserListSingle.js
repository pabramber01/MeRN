import { Link } from 'react-router-dom';
import { DUButton, SuspenseImg } from '../../layout';
import {
  banUser,
  changeFollowShow,
  changeFollowList,
  unbanUser,
  unfollowUser,
} from '..';
import {
  UserListWrapper,
  UserListSinglePlaceholderAvatar,
  changeEnabled,
} from '.';

function UserListSingle({
  data: { username, avatar, email, role, enabled },
  page,
}) {
  const allPages = {
    admin: {
      isDoAction: enabled,
      doAction: () => banUser(username),
      undoAction: () => unbanUser(username),
      doText: 'Ban',
      undoText: 'Unban',
      thenActions: [() => changeEnabled({ username })],
    },
    follows: {
      condition: () => window.confirm('Do you want to unfollow this user?'),
      isDoAction: false,
      undoAction: () => unfollowUser(username),
      undoText: 'Unfollow',
      thenActions: [
        () => changeFollowList({ username }),
        () => changeFollowShow({ username }),
      ],
    },
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
          {page.startsWith('admin') && role === 'admin' ? (
            <span className="admin-role">Admin</span>
          ) : (
            <DUButton page={page} allPages={allPages} />
          )}
        </div>
      </div>
    </UserListWrapper>
  );
}

export default UserListSingle;
