import { useSelector } from 'react-redux';
import { Wrapper } from '.';

function User() {
  const { userProfile } = useSelector((store) => store.user);

  const handleImageLoad = (e) => {
    const avatar = e.target;
    const avatarPlaceholder = avatar.nextSibling;
    const name = avatar.nextSibling.nextSibling.firstChild;
    const namePlaceholder = name.nextSibling;

    avatar.classList.remove('d-none');
    name.classList.remove('d-none');
    avatarPlaceholder.remove();
    namePlaceholder.remove();
  };

  return (
    <Wrapper>
      <div className="profile">
        <img
          src={userProfile.avatar}
          alt={userProfile.username}
          className="user-img d-none"
          onLoad={handleImageLoad}
        />
        <span className="placeholder placeholder-img" />
        <div className="profile-info">
          <h4 className="d-none">{userProfile.username}</h4>
          <span className="placeholder placeholder-wave">loading...</span>
        </div>
      </div>
    </Wrapper>
  );
}

export default User;
