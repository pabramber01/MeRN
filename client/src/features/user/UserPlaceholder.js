import { Wrapper } from '.';

function UserPlaceholder() {
  return (
    <Wrapper>
      <div className="profile">
        <span className="placeholder placeholder-img" />
        <div className="profile-info">
          <span className="placeholder placeholder-wave">loading...</span>
        </div>
      </div>
    </Wrapper>
  );
}

export default UserPlaceholder;
