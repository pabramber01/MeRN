import { Link } from 'react-router-dom';
import { Wrapper } from '.';

function FeedSingle({ data: { title, images, user } }) {
  const handleImageLoad = (e) => {
    const img = e.target;
    const photoInfo = img.nextSibling.nextSibling;
    const photoTitle = photoInfo.firstChild;
    const imgPlaceholder = img.nextSibling;
    const photoTitlePlaceholder = photoTitle.nextSibling;

    img.classList.remove('d-none');
    photoInfo.classList.remove('placeholder', 'placeholder-wave');
    photoTitle.classList.remove('d-none');
    imgPlaceholder.remove();
    photoTitlePlaceholder.remove();
  };

  const handleAvatarLoad = (e) => {
    const avatar = e.target;
    const avatarPlaceholder = avatar.nextSibling;

    avatar.classList.remove('d-none');
    avatarPlaceholder.remove();
  };

  return (
    <Wrapper>
      <div className="photo">
        <img
          src={images[0]}
          alt={title}
          onLoad={handleImageLoad}
          className="d-none"
        />
        <span className="placeholder placeholder-img" />
        <div className="photo-info d-flex justify-content-between align-items-center placeholder placeholder-wave">
          <h4 className="m-0 d-none">{title}</h4>
          <span className="placeholder placeholder-wave col-6"></span>
          <Link to={`/users/${user.username}`}>
            <img
              src={user.avatar}
              alt={user.username}
              onLoad={handleAvatarLoad}
              className="user-img d-none"
            />
            <span className="placeholder placeholder-avatar"></span>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
}

export default FeedSingle;
