import { UserListWrapper, UserListSinglePlaceholderAvatar } from '.';

function UserListSinglePlaceholder() {
  return (
    <UserListWrapper>
      <div className="user-card">
        <div className="user">
          <UserListSinglePlaceholderAvatar />
          <span className="placeholder placeholder-wave ms-2">Loading...</span>
        </div>
        <div className="user-actions">
          <span className="placeholder placeholder-wave ban-placeholder">
            Loading...
          </span>
        </div>
      </div>
    </UserListWrapper>
  );
}

export default UserListSinglePlaceholder;
