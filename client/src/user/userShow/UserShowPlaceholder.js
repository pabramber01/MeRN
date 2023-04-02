import { UserShowPlaceholderAvatar, UserShowWrapper } from '.';

function UserShowPlaceholder({ myProfile }) {
  return (
    <UserShowWrapper>
      <div className="profile">
        <div className="profile-data">
          <UserShowPlaceholderAvatar />
          <span className="username-placeholder placeholder placeholder-wave" />
        </div>
        <div className="profile-info">
          <span className="mx-1 placeholder placeholder-wave">loading...</span>
          <span className="mx-1 placeholder placeholder-wave">loading...</span>
          <span className="mx-1 placeholder placeholder-wave">loading...</span>
        </div>
        {!myProfile && (
          <div className="actions mx-3">
            <span className="placeholder placeholder-wave do-placeholder" />
          </div>
        )}
      </div>
    </UserShowWrapper>
  );
}

export default UserShowPlaceholder;
