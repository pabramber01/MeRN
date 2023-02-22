import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SuspenseImg } from '../../layout';
import { UserWrapper, UserPlaceholderAvatar, getUserProfile } from '.';

function User({ username }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProfile } = useSelector((store) => store.user);
  const initialState = {
    pending: true,
    load: false,
    error: false,
  };

  useEffect(() => {
    if (username !== userProfile.username) {
      dispatch(getUserProfile(username))
        .unwrap()
        .catch(() => navigate('/'));
    } // eslint-disable-next-line
  }, [username]);

  return (
    <UserWrapper>
      <div className="profile">
        {username !== userProfile.username ? (
          <UserPlaceholderAvatar />
        ) : (
          <>
            <SuspenseImg
              fallback={<UserPlaceholderAvatar />}
              attr={{ src: userProfile.avatar, className: 'user-img', alt: '' }}
            />
            <div className="profile-info">
              <h4>{userProfile.username}</h4>
            </div>
          </>
        )}
      </div>
    </UserWrapper>
  );
}

export default User;
