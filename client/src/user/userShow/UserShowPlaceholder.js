import { UserShowPlaceholderAvatar, UserShowWrapper } from '.';

function UserShowPlaceholder() {
  return (
    <UserShowWrapper>
      <div className="profile">
        <UserShowPlaceholderAvatar />
        <div className="profile-info">
          <span className="placeholder placeholder-wave">loading...</span>
        </div>
      </div>
    </UserShowWrapper>
  );
}

export default UserShowPlaceholder;
