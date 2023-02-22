import { UserPlaceholderAvatar, UserWrapper } from '.';

function UserPlaceholder() {
  return (
    <UserWrapper>
      <div className="profile">
        <UserPlaceholderAvatar />
        <div className="profile-info">
          <span className="placeholder placeholder-wave">loading...</span>
        </div>
      </div>
    </UserWrapper>
  );
}

export default UserPlaceholder;
