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
    const anchor = e.target.parentNode;
    const anchorPlaceholder = anchor.nextSibling;

    anchor.classList.remove('d-none');
    anchorPlaceholder.remove();
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
          <span className="placeholder placeholder-wave placeholder-h1 col-6"></span>
          <a href="http://example.com" className="d-none">
            <img
              src={user.avatar}
              alt={user.username}
              onLoad={handleAvatarLoad}
              className="user-img"
            />
          </a>
          <span className="placeholder placeholder-wave placeholder-h1 col-1"></span>
        </div>
      </div>
    </Wrapper>
  );
}

export default FeedSingle;
