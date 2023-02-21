import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  FeedSinglePlaceholderAvatar,
  FeedSinglePlaceholderImage,
  Wrapper,
} from '.';

function FeedSingle({ data: { title, images, user } }) {
  const initialState = {
    pending: true,
    load: false,
    error: false,
  };
  const [imageState, setImageState] = useState(initialState);
  const [avatarState, setAvatarState] = useState(initialState);

  const handleImageLoad = () =>
    setImageState({ pending: false, load: true, error: false });

  const handleImageError = () =>
    setImageState({ pending: false, load: false, error: true });

  const handleAvatarLoad = () =>
    setAvatarState({ pending: false, load: true, error: false });

  const handleAvatarError = () =>
    setAvatarState({ pending: false, load: false, error: true });

  return (
    <Wrapper>
      <div className="photo">
        {imageState.error ? (
          <FeedSinglePlaceholderImage />
        ) : (
          <>
            {imageState.pending && <FeedSinglePlaceholderImage />}
            <img
              src={images[0]}
              className={`${imageState.pending ? 'd-none' : undefined}`}
              alt={title}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </>
        )}
        <div
          className={`photo-info d-flex justify-content-between align-items-center ${
            (imageState.pending || imageState.error) &&
            'placeholder placeholder-wave'
          }`}
        >
          <h4 className="m-0">{title}</h4>
          <Link to={`/users/${user.username}`}>
            {avatarState.error ? (
              <FeedSinglePlaceholderAvatar />
            ) : (
              <>
                {avatarState.pending && <FeedSinglePlaceholderAvatar />}
                <img
                  src={user.avatar}
                  className={`user-img ${avatarState.pending && 'd-none'}`}
                  alt={user.username}
                  onLoad={handleAvatarLoad}
                  onError={handleAvatarError}
                />
              </>
            )}
          </Link>
        </div>
      </div>
    </Wrapper>
  );
}

export default FeedSingle;
