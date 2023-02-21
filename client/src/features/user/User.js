import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../context';
import { Wrapper, UserPlaceholderAvatar } from '.';

function User({ username }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProfile } = useSelector((store) => store.user);
  const initialState = {
    pending: true,
    load: false,
    error: false,
  };
  const [avatarState, setAvatarState] = useState(initialState);

  useEffect(() => {
    if (username !== userProfile.username) {
      setAvatarState(initialState);
      dispatch(getUserProfile(username))
        .unwrap()
        .catch(() => navigate('/'));
    } // eslint-disable-next-line
  }, [username]);

  const handleImageLoad = () => {
    setAvatarState({ pending: false, load: true, error: false });
  };

  const handleImageError = () => {
    setAvatarState({ pending: false, load: false, error: true });
  };

  return (
    <Wrapper>
      <div className="profile">
        {avatarState.pending && <UserPlaceholderAvatar />}
        {username === userProfile.username && (
          <>
            {avatarState.error ? (
              <UserPlaceholderAvatar />
            ) : (
              <img
                src={userProfile.avatar}
                className={`user-img ${avatarState.pending && 'd-none'}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                alt=""
              />
            )}
            <div className="profile-info">
              <h4>{userProfile.username}</h4>
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
}

export default User;
