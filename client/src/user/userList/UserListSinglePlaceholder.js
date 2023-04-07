import { UserListWrapper } from '.';
import { AvatarPlaceholder } from '../../layout';

function UserListSinglePlaceholder() {
  return (
    <UserListWrapper>
      <div className="user-card">
        <div className="user">
          <AvatarPlaceholder size="sm" shadow={true} />
          <span className="placeholder placeholder-wave ms-2">Loading...</span>
        </div>
        <div className="user-actions">
          <span className="placeholder placeholder-wave do-placeholder">
            Loading...
          </span>
        </div>
      </div>
    </UserListWrapper>
  );
}

export default UserListSinglePlaceholder;
